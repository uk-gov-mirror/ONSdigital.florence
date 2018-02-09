import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectableBox from '../../../components/selectable-box-new/SelectableBox';
import releases from '../../../utilities/api-clients/releases';
import log, { eventTypes } from '../../../utilities/log';
import Input from '../../../components/Input';
import date from '../../../utilities/date'

const propTypes = {
    onClose: PropTypes.func.isRequired,
    onReleaseSelect: PropTypes.func.isRequired
};

const columns = [
    {
        width: "8",
        heading: "Name"
    },
    {
        width: "2",
        heading: "Publish date"
    },
    {
        width: "2",
        heading: "Status"
    }
]

export class ScheduleByRelease extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetchingReleases: false,
            isFetchingExtraReleases: false,
            isFetchingSearchedReleases: false,
            tableData: [],
            currentPage: 0,
            numberOfPages: 0,
            numberOfReleases: 0,
            releasesPerPage: 10,
            searchSubmitDelay: 300,
            searchQuery: ""
        };

        this.searchTimeout = null;

        this.loadMoreReleases = this.loadMoreReleases.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        this.setState({isFetchingReleases: true});
        releases.getUpcoming(null, null, this.state.releasesPerPage).then(upcomingReleases => {
            const tableData = this.mapReleasesToTableRows(upcomingReleases.result.results);
            this.setState({
                isFetchingReleases: false,
                numberOfReleases: upcomingReleases.result.numberOfResults,
                numberOfPages: upcomingReleases.result.paginator ? upcomingReleases.result.paginator.numberOfPages : 1,
                currentPage: 1,
                tableData
            });
        }).catch(error => {
            //TODO tell the user about the error

            this.setState({isFetchingReleases: false});
            log.add(eventTypes.unexpectedRuntimeError, {message: "Error fetching upcoming releases for 'scheduled by release' functionality: " + JSON.stringify(error)});
            console.error("Error fetching upcoming releases for 'scheduled by release' functionality", error);
        });
    }

    mapReleasesToTableRows(releases) {
        const rows = releases.filter(release => {
            if (release.description.published) {
                return false;
            }
            if (release.description.cancelled) {
                return false;
            }
            return true;
        }).map(release => {
            let status = "";
            if (!release.description.finalised) {
                status = "Not finalised"
            }

            //TODO check whether the release is already associated to a collection

            return {
                id: release.uri,
                columnValues: [<div dangerouslySetInnerHTML={{__html: release.description.title}} key={release.uri}></div>, date.format(release.description.releaseDate, "ddd, dd/mm/yyyy h:MMTT"), status],
                returnValue: {
                    uri: release.uri,
                    releaseDate: release.description.releaseDate,
                    title: release.description.title
                }
            }
        });

        return rows;
    }

    handleSearch(event) {
        const searchQuery = event.target.value;

        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {this.searchReleases(searchQuery)}, this.state.searchSubmitDelay);
    }

    searchReleases(query) {
        this.setState({
            isFetchingReleases: query ? false : true, // is we haven't got a query we're getting all releases so we should reflect this in state
            isFetchingSearchedReleases: true,
            searchQuery: query
        });

        releases.getUpcoming(null, query, this.state.releasesPerPage).then(searchedReleases => {
            const tableData = this.mapReleasesToTableRows(searchedReleases.result.results);
            this.setState({
                isFetchingSearchedReleases: false,
                isFetchingReleases: false,
                numberOfReleases: searchedReleases.result.numberOfResults || 0,
                numberOfPages: searchedReleases.result.paginator ? searchedReleases.result.paginator.numberOfPages : 1,
                currentPage: 1,
                searchQuery: query, // just incase a request takes ages this means the state is true about what query is actually being shown
                tableData
            });
        }).catch(error => {
            //TODO tell the user about the error

            this.setState({
                isFetchingSearchedReleases: false, 
                isFetchingReleases: false
            });
            log.add(eventTypes.unexpectedRuntimeError, {message: "Error fetching queried releases for 'schedule by release' functionality: " + JSON.stringify(error)});
            console.error("Error fetching queried releases for 'schedule by release' functionality", error);
        });
    }

    loadMoreReleases() {
        this.setState({isFetchingExtraReleases: true});
        releases.getUpcoming(this.state.currentPage+1, this.state.searchQuery, this.state.releasesPerPage).then(upcomingReleases => {
            this.setState(state => ({
                isFetchingExtraReleases: false,
                currentPage: state.currentPage + 1,
                tableData: [...state.tableData , ...this.mapReleasesToTableRows(upcomingReleases.result.results)]
            }));
        }).catch(error => {
            //TODO tell the user about the error

            this.setState({isFetchingExtraReleases: false});
            log.add(eventTypes.unexpectedRuntimeError, {message: "Error fetching extra upcoming releases for 'scheduled by release' functionality: " + JSON.stringify(error)});
            console.error("Error fetching extra upcoming releases for 'scheduled by release' functionality", error);
        });
    }

    renderQueryText() {
        if (this.state.isFetchingSearchedReleases) {
            return <p className="margin-bottom--1">Getting releases matching the term '<span className="font-weight--600">{this.state.searchQuery}</span>'</p>
        }

        if (this.state.numberOfReleases === 0) {
            return <p className="margin-bottom--1">No releases matching the term '<span className="font-weight--600">{this.state.searchQuery}</span>'</p>
        }

        return (
            <p className="margin-bottom--1">
                Showing <span className="font-weight--600">{this.state.numberOfReleases}</span> release{this.state.numberOfReleases > 1 && "s"} matching the term '<span className="font-weight--600">{this.state.searchQuery}</span>'
            </p>
        )
    }

    render() {
        return (
            <div className="grid">
                <div className="modal__header grid">
                    <div className="grid__col-8">
                        <h1 className="modal__title margin-top--2">Select a calendar entry</h1>
                    </div>
                    <div className="grid__col-4">
                        <Input id="search-releases" disabled={this.state.isFetchingReleases} onChange={this.handleSearch} label="Search by release name"/>
                    </div>
                </div>
                <div className="modal__body grid__col-12">
                    {this.state.isFetchingReleases &&
                        <p className="margin-bottom--1">Getting all releases...</p>
                    }
                    {this.state.searchQuery &&
                        this.renderQueryText()
                    }
                    <SelectableBox
                        columns={columns}
                        isUpdating={this.state.isFetchingReleases || this.state.isFetchingSearchedReleases}
                        handleItemClick={this.props.onReleaseSelect}
                        rows={this.state.tableData}
                    />
                    {!this.state.isFetchingReleases &&
                        <div className="grid grid--justify-space-between margin-top--1">
                            <div>
                                {this.state.numberOfPages !== this.state.currentPage &&
                                    <button className="btn btn--primary" type="button" onClick={this.loadMoreReleases} disabled={this.state.isFetchingExtraReleases}>Show more releases</button>
                                }
                                {this.state.isFetchingExtraReleases && 
                                    <div className="margin-left--1 inline-block">
                                        <div className="loader loader--dark"></div>
                                    </div>
                                }
                            </div>
                            <div>
                                {this.state.tableData.length > 0 ?
                                    <p>Showing releases 1 to {this.state.tableData.length} of {this.state.numberOfReleases}</p>
                                    :
                                    <p>No upcoming releases to show</p>
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className="modal__footer grid__col-12">
                    <div>
                        <button className="btn" type="button" onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

ScheduleByRelease.propTypes = propTypes;

export default ScheduleByRelease;