package upload

import (
	"bytes"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/ONSdigital/go-ns/log"
	"github.com/gorilla/schema"

	"gopkg.in/amz.v1/aws"
	"gopkg.in/amz.v1/s3"
)

// Bucket represents an s3 bucket to upload files to
type Bucket interface {
	Multi(key, contType string, perm s3.ACL) (Multi, error)
	Put(path string, data []byte, contType string, perm s3.ACL) error
}

// Multi represents a multi part upload to s3
type Multi interface {
	ListParts() ([]s3.Part, error)
	PutPart(n int, r io.ReadSeeker) (s3.Part, error)
	Complete([]s3.Part) error
	Abort() error
}

// S3Bucket implements the bucket interface
type S3Bucket struct {
	bucket *s3.Bucket
}

// Multi calls the s3 bucket multi method
func (b S3Bucket) Multi(key, contType string, perm s3.ACL) (Multi, error) {
	m, err := b.bucket.Multi(key, contType, perm)
	return Multi(m), err
}

// Put calls the s3 bucket put method
func (b S3Bucket) Put(path string, data []byte, contType string, perm s3.ACL) error {
	return b.bucket.Put(path, data, contType, perm)
}

// Resumable represents resumable js upload query pararmeters
type Resumable struct {
	ChunkNumber      int    `schema:"resumableChunkNumber"`
	ChunkSize        int    `schema:"resumableChunkSize"`
	CurrentChunkSize int    `schema:"resumableCurrentChunkSize"`
	TotalSize        int    `schema:"resumableTotalSize"`
	Type             string `schema:"resumableType"`
	Identifier       string `schema:"resumableIdentifier"`
	FileName         string `schema:"resumableFilename"`
	RelativePath     string `schema:"resumableRelativePath"`
	TotalChunks      int    `schema:"resumableTotalChunks"`
}

// New creates a new instance of Uploader using provided s3
// environment authentication
func New(bucketName string) (*Uploader, error) {
	auth, err := aws.EnvAuth()
	if err != nil {
		return nil, err
	}

	conn := s3.New(auth, aws.EUWest)

	return &Uploader{S3Bucket{conn.Bucket(bucketName)}}, nil
}

// Uploader represents the necessary configuration for uploading a file
type Uploader struct {
	bucket Bucket
}

// CheckUploaded checks to see if a chunk has been uploaded
func (u *Uploader) CheckUploaded(w http.ResponseWriter, req *http.Request) {
	if err := req.ParseForm(); err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resum := new(Resumable)

	if err := schema.NewDecoder().Decode(resum, req.Form); err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Debug("info", log.Data{"resum": resum})

	m, err := u.bucket.Multi(resum.Identifier, resum.Type, "public-read")
	if err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	parts, err := m.ListParts()
	if err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	for _, part := range parts {
		if part.N == resum.ChunkNumber {
			log.Debug("chunk number already uploaded", log.Data{"chunk_number": resum.ChunkNumber, "file_name": resum.FileName, "identifier": resum.Identifier})

			if len(parts) == resum.TotalChunks {
				completeS3MultiUpload(w, req, resum, parts, m)
			}

			w.WriteHeader(http.StatusOK)
			return
		}
	}

	log.Debug("chunk number not uploaded", log.Data{"chunk_number": resum.ChunkNumber, "file_name": resum.FileName})
	w.WriteHeader(http.StatusNotFound)
}

// Upload handles the uploading a file to AWS s3
func (u *Uploader) Upload(w http.ResponseWriter, req *http.Request) {
	if err := req.ParseForm(); err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	resum := new(Resumable)

	if err := schema.NewDecoder().Decode(resum, req.Form); err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	content, _, err := req.FormFile("file")
	if err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	defer content.Close()

	b, err := ioutil.ReadAll(content)
	if err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Debug("info2", log.Data{"resum": resum})

	// If there is only one chunk to upload there is no point creating a multi part upload to s3
	if resum.TotalChunks == 1 {
		if err = u.bucket.Put(resum.Identifier, b, resum.Type, "public-read"); err != nil {
			log.ErrorR(req, err, nil)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		log.Trace("uploaded file successfully", log.Data{"file-name": resum.FileName, "uid": resum.Identifier, "size": resum.TotalSize})
		return
	}

	m, err := u.bucket.Multi(resum.Identifier, resum.Type, "public-read")
	if err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	rs := bytes.NewReader(b)

	if _, err = m.PutPart(resum.ChunkNumber, rs); err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Info("chunk accepted", log.Data{
		"chunk_number": resum.ChunkNumber,
		"max_chunks":   resum.TotalChunks,
		"file_name":    resum.FileName,
	})

	parts, err := m.ListParts()
	if err != nil {
		log.ErrorR(req, err, nil)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if len(parts) == resum.TotalChunks {
		completeS3MultiUpload(w, req, resum, parts, m)
	}
}

func completeS3MultiUpload(w http.ResponseWriter, req *http.Request, resum *Resumable, parts []s3.Part, m Multi) {

	if err := m.Complete(parts); err != nil {
		log.ErrorR(req, err, nil)
		if err := m.Abort(); err != nil {
			log.ErrorR(req, err, nil)
		}
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Trace("uploaded file successfully", log.Data{"file-name": resum.FileName, "uid": resum.Identifier, "size": resum.TotalSize})
}
