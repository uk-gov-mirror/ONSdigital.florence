import http from '../http';

export default class datasets {

    static get(datasetID) {

        return http.get(`/dataset/datasets/${datasetID}`)
            .then(response => {
                return response;
            });
    }

    static getAll() {

        return http.get(`/dataset/datasets`)
            .then(response => {
                return response;
            });
    }

    static getInstance(instanceID) {
        return http.get(`/dataset/instances/${instanceID}`)
             .then(response => {
                 return response;
             });
    }

    static updateInstanceEdition(instanceID, edition) {
        const body = {
            edition
        }
        return http.put(`/dataset/instances/${instanceID}`, body, true)
            .then(response => {
                return response;
            });
    }

    static approveInstance(instanceID) {
        // TODO unstub this once a version/instance can be reviewed and approved in the API
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        })
    }

    static updateDatasetMetadata(datasetID, metadata) {
        // TODO unstub once dataset API handles putting metadata to a dataset ID
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
        // const body = {
        //     metadata
        // }
        // return http.put(`/dataset/datasets/${datasetID}`, body, true)
        //     .then(response => {
        //         return response;
        //     })
    }

    static approveDatasetMetadata(datasetID) {
        // TODO unstub this once dataset metadata can be reviewed and approved in the API
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        })
    }

    static getCompletedInstances() {
         return http.get(`/dataset/instances?state=completed`)
             .then(response => {
                 return response;
             });
    }

    static getNewVersionsAndCompletedInstances() {
        return http.get(`/dataset/instances?state=completed,edition-confirmed`)
            .then(response => {
                return response;
            });
    }
}
