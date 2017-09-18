import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import SelectableBoxController from '../../components/selectable-box/SelectableBoxController';
import datasetImport from '../../utilities/api-clients/datasetImport';
import datasets from '../../utilities/api-clients/datasets';
import notifications from '../../utilities/notifications';

const propTypes = {
    rootPath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

class DatasetsController extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            datasets: [],
            isFetchingDatasets: false
        };

        this.goToDatasetMetadata = this.goToDatasetMetadata.bind(this);
    }

    componentWillMount() {
        this.setState({isFetchingDatasets: true});
        const fetches = [
            datasetImport.getCompleted(),
            datasets.getCompleted()
        ]
        Promise.all(fetches).then(responses => {
            this.setState({
                isFetchingDatasets: false,
                datasets: this.mapAPIResponsesToViewProps(responses[0], responses[1].items),
            });
        }).catch(error => {
            switch (error.status) {
                case(403):{
                    const notification = {
                        "type": "warning",
                        "message": "You do not permission to view submitted datasets.",
                        isDismissable: true
                    }
                    notifications.add(notification)
                    break;
                }
                case(404):{
                    const notification = {
                        "type": "warning",
                        "message": "No API route available to get all submitted datasets",
                        isDismissable: true
                    }
                    notifications.add(notification)
                    break;
                }
                case("RESPONSE_ERR"):{
                    const notification = {
                        "type": "warning",
                        "message": "An error's occurred whilst trying to get the submitted datasets.",
                        isDismissable: true
                    }
                    notifications.add(notification)
                    break;
                }
                case("FETCH_ERR"): {
                    const notification = {
                        type: "warning",
                        message: "There's been a network error whilst trying to get the submitted datasets. Please check you internet connection and try again in a few moments.",
                        isDismissable: true
                    }
                    notifications.add(notification);
                    break;
                }
                case("UNEXPECTED_ERR"): {
                    const notification = {
                        type: "warning",
                        message: "An unexpected error has occurred whilst trying to get the submitted datasets.",
                        isDismissable: true
                    }
                    notifications.add(notification);
                    break
                }
                default: {
                    const notification = {
                        type: "warning",
                        message: "An unexpected error's occurred whilst trying to get the submitted datasets.",
                        isDismissable: true
                    }
                    notifications.add(notification);
                    break;
                }
            }
            this.setState({isFetchingData: false});
        });
    }

    mapAPIResponsesToViewProps(completedJobs, completedDatasets) {
        // TODO once import API stores uploader info we want to map it to the completed dataset for the view to display
        return completedDatasets.map(dataset => {
            return {
                id: dataset.id,
                name: dataset.title || `No name available (${dataset.id})`
            }
        });
    }

    goToDatasetMetadata(props) {
        console.log(`Clicked dataset:\n`, props);
        this.props.dispatch(push(`${this.props.rootPath}/datasets/metadata/${props.id}`));
    }

    render() {
        return (
            <div className="grid grid--justify-center">
                <div className="grid__col-4">
                    <h1>Select a dataset</h1>
                    <Link className="margin-bottom--1" to={`${this.props.rootPath}/datasets/uploads`}>Upload a dataset</Link>
                    <SelectableBoxController 
                        heading="Dataset title"
                        isUpdating={this.state.isFetchingDatasets}
                        handleItemClick={this.goToDatasetMetadata}
                        items={this.state.datasets}
                    />
                </div>
            </div>
        )
    }
}

DatasetsController.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        rootPath: state.state.rootPath
    }
}

export default connect(mapStateToProps)(DatasetsController);