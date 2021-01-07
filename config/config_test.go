package config

import (
	"testing"
	"time"

	. "github.com/smartystreets/goconvey/convey"
)

func TestGetRetrunsDefaultValues(t *testing.T) {
	t.Parallel()
	Convey("When a loading a configuration, default values are return", t, func() {
		configuration, err := Get()
		So(err, ShouldBeNil)
		So(configuration, ShouldResemble, &Config{
			BindAddr:                   ":8080",
			APIRouterURL:               "http://localhost:23200",
			APIRouterVersion:           "v1",
			RouterURL:                  "http://localhost:20000",
			DatasetControllerURL:       "http://localhost:24000",
			TableRendererURL:           "http://localhost:23300",
			SharedConfig:               SharedConfig{EnableUploadService: false, EnableDatasetImport: false, EnableHomepagePublishing: false},
			GracefulShutdownTimeout:    10 * time.Second,
			HealthCheckInterval:        30 * time.Second,
			HealthCheckCriticalTimeout: 90 * time.Second,
		})
	})
}
