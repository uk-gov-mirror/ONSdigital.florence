import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import datasets from '../../../utilities/api-clients/datasets';
import notifications from '../../../utilities/notifications';
import url from '../../../utilities/url'
import date from '../../../utilities/date'

import SimpleSelectableList from '../../../components/simple-selectable-list/SimpleSelectableList';

const propTypes = {
    routeParams: PropTypes.shape({
        datasetID: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
}

export class DatasetEditionsController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetchingDataset: false,
            dataset: {},
            isFetchingEditions: false,
            editions: [
                {
                    title: "Create new edition", 
                    id: "create-new-edition",
                    url:  this.props.location.pathname + "/instances",
                }
            ],
        }

    }

    async componentWillMount() {
        const datasetID = this.props.routeParams.datasetID;
        const dataset = await this.getDataset(datasetID);
        this.setState({dataset: this.mapDatasetToState(dataset)});
        this.createListOfEditions(datasetID);
    }

    createListOfEditions = async(datasetID) => {    
        const editions = await this.getEditions(datasetID) || [];
        const editionsWithReleaseDates = await this.mapVersionReleaseDatesToEditions(datasetID, editions)
        this.setState({editions: [...this.state.editions, ...editionsWithReleaseDates]});
    }

    getDataset = datasetID => {
        this.setState({isFetchingDataset: true});
        return datasets.get(datasetID).then(dataset => {
            this.setState({isFetchingDataset: false});
            return this.mapDatasetToState(dataset);
        }).catch(error => {
            switch (error.status) {
                case(404): {
                    const notification = {
                        "type": "warning",
                        "message": "No API route available for a list of datasets. You should still be able to use this page, or you can refresh.",
                        isDismissable: true
                    }
                    notifications.add(notification)
                    break;
                }
                case("RESPONSE_ERR"):{
                    const notification = {
                        "type": "warning",
                        "message": "An error's occurred whilst trying to get a list of datasets.",
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
                        message: "An unexpected error has occurred whilst trying to get a list of datasets.",
                        isDismissable: true
                    }
                    notifications.add(notification);
                    break;
                }
                default: {
                    const notification = {
                        type: "warning",
                        message: "An unexpected error's occurred whilst trying to get a list of datasets.",
                        isDismissable: true
                    }
                    notifications.add(notification);
                    break;
                }
            }
            console.error(`Error getting dataset (${datasetID}):\n`, error);
            this.setState({isFetchingDataset: false});
        })
    }

    mapDatasetToState = datasetResponse => {
        try {
            const dataset = datasetResponse.current || datasetResponse.next || datasetResponse;
            return {
                title: dataset.title
            }
        } catch (error) {
            const notification = {
                type: "warning",
                message: "An unexpected error occurred when trying to get dataset details, so some functionality in Florence may not work as expected. Try refreshing the page",
                isDismissable: true
            }
            notifications.add(notification);
            console.error("Error getting dataset details to state:\n", error);
        }
    }

    getEditions = datasetID => {
        this.setState({isFetchingEditions: true});
        return datasets.getEditions(datasetID).then(editions => {
            this.setState({isFetchingEditions: false});
            return this.mapDatasetEditionsToView(editions.items);
        }).catch(error => {
            switch (error.status) {
                case(404): {
                    const notification = {
                        "type": "warning",
                        "message": "No API route available for a list of editions.",
                        isDismissable: true
                    }
                    notifications.add(notification)
                    break;
                }
                case("RESPONSE_ERR"):{
                    const notification = {
                        "type": "warning",
                        "message": "An error's occurred whilst trying to get a list of editions.",
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
                        message: "An unexpected error has occurred whilst trying to get a list of editions.",
                        isDismissable: true
                    }
                    notifications.add(notification);
                    break;
                }
                default: {
                    const notification = {
                        type: "warning",
                        message: "An unexpected error's occurred whilst trying to get a list of editions.",
                        isDismissable: true
                    }
                    notifications.add(notification);
                    break;
                }
            }
            console.error(`Error getting dataset (${datasetID}):\n`, error);
            this.setState({isFetchingEditions: false});
        });
    }

    mapDatasetEditionsToView = editions => {
        try {
            return editions.map(edition => {
                return {
                    title: this.state.dataset.title, 
                    id: edition.current.edition,
                    url:  this.props.location.pathname + "/editions/" + edition.current.edition,
                    details: [
                        "Edition: " + edition.current.edition,
                        "Release date: loading..."
                    ],
                    latestVersion: edition.current.links.latest_version.id
                }
            })
        } catch (error) {
            const notification = {
                type: "warning",
                message: "An unexpected error occurred when trying to get edition details, so some functionality in Florence may not work as expected. Try refreshing the page",
                isDismissable: true
            }
            notifications.add(notification);
            console.error("Error getting mapping editions to state:\n", error);
        }
    }

    mapVersionReleaseDatesToEditions = async(datasetID, editions) => {
        const allVersions = await this.getAllVersions(datasetID, editions).then(versions => {
            return versions;
        });
        const mappedEditions = editions.map(edition => {
            allVersions.find(version => {
                if (version.edition !== edition.id) {
                    return
                }
                edition.details[1] = `Release date: ${date.format(version.release_date, "dd mmmm yyyy")}`
            });
            return edition;
        });
        return mappedEditions;
    }

    getAllVersions = async(datasetID, editions) => {
        const versionPromises = editions.map(async(edition) => {
            return await this.getVersion(datasetID, edition.id, edition.latestVersion);
        })
        const allVersions = await Promise.all(versionPromises).then(version => {
            return version;
        })
        return allVersions;
    }

    getVersion = async(datasetID, editionID, versionID) => {
        return await datasets.getVersion(datasetID, editionID, versionID).then(versionResp => {
            return versionResp;
        })
    }

    handleBackButton = () => {
        const previousUrl = url.resolve("../");
        this.props.dispatch(push(previousUrl));
    }

    render() {
        return (
            <div className="grid grid--justify-center">
                <div className="grid__col-9">
                    <div className="margin-top--2">
                        &#9664; <button type="button" className="btn btn--link" onClick={this.handleBackButton}>Back</button>
                    </div>
                    <h1 className="margin-top--1 margin-bottom--1">Select an Edition</h1>
                    <p className="margin-bottom--1 font-size--18"><span className="font-weight--600">Dataset</span>: {this.state.dataset.title ? this.state.dataset.title : "loading..."}</p>
                    <SimpleSelectableList rows={this.state.editions} isFetchingData={this.state.fetchingEditions}/>
               </div>
            </div>
        )
    }
}

DatasetEditionsController.propTypes = propTypes;


export default connect()(DatasetEditionsController);

