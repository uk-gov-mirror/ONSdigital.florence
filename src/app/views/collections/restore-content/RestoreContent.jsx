import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectableBox from '../../../components/selectable-box-new/SelectableBox'
import Input from '../../../components/Input'

import content from '../../../utilities/api-clients/content'
import notifications from '../../../utilities/notifications';
import log, {eventTypes} from '../../../utilities/log';

const propTypes = {
    activeCollection: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
}

export class RestoreContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGettingDeletedContent: false,
            isRestoringDeletingContent: false,
            allDeletedContent: [],
            filteredDeletedContent: [],
            activeItem: {},
        };

        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleDoneClick = this.handleDoneClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        this.getAllDeletedContent();
    }

    mapDeletedContentToState(deletedContent) {
        try {
            return {
                id: deletedContent.id.toString(),
                pageTitle: deletedContent.pageTitle,
                columnValues: [
                    <span key={`${deletedContent.id}-col-val-1`}>{deletedContent.pageTitle}<br/>{deletedContent.uri}</span>,
                    deletedContent.deletedFiles.length.toString(),
                    deletedContent.eventDate
                ],
                returnValue: {id: deletedContent.id.toString(), uri: deletedContent.uri, title: deletedContent.pageTitle, type: deletedContent.type},
            }
        } catch (error) {
            log.add(eventTypes.unexpectedRuntimeError, `Error mapping deleted content (id: ${deletedContent.id}, title: ${deletedContent.pageTitle})to state. ${error}`);
            console.error(`Error mapping deleted content (id: ${deletedContent.id}, title: ${deletedContent.pageTitle})to state. ${error}`);
        }

    }

    getAllDeletedContent() {
        this.setState({isGettingDeletedContent: true});
        content.getAllDeleted().then(allDeletedContent => {
            const allDeletes = allDeletedContent.map(deleteContent => {
                return this.mapDeletedContentToState(deleteContent)
            });
            this.setState({
                isGettingDeletedContent: false,
                allDeletedContent: allDeletes || []
            });
        }).catch(error => {
            this.setState({isGettingDeletes: false});
            switch(error.status) {
                case(401): {
                    // This is handled by the request function, so do nothing here
                    break;
                }
                case(404): {
                    const notification = {
                        type: 'warning',
                        message: `No API route available to get deleted content.`,
                        autoDismiss: 5000
                    };
                    notifications.add(notification);
                    break;
                }
                case("RESPONSE_ERR"): {
                    const notification = {
                        type: "warning",
                        message: "An error's occurred whilst trying to get deleted content.",
                        isDismissable: true
                    };
                    notifications.add(notification);
                    break;
                }
                case("UNEXPECTED_ERR"): {
                    const notification = {
                        type: "warning",
                        message: "An unexpected error's occurred whilst trying to get deleted content.",
                        isDismissable: true
                    };
                    notifications.add(notification);
                    break;
                }
                case("FETCH_ERR"): {
                    const notification = {
                        type: "warning",
                        message: "There's been a network error whilst trying to get deleted content.",
                        isDismissable: true
                    };
                    notifications.add(notification);
                    break;
                }
            }
            console.error("Error fetching all collections:\n", error);
        });
    }

    handleItemClick(item) {
        this.setState({activeItem: item});
    }

    handleDoneClick() {
        this.setState({isRestoringDeletingContent: true});
        content.restoreDeleted(this.state.activeItem.id, this.props.activeCollection.id).then(() => {
            this.props.onSuccess(this.state.activeItem);
            this.setState({isRestoringDeletingContent: false});
        }).catch(error => {
            switch(error.status) {
                case(401): {
                    // This is handled by the request function, so do nothing here
                    break;
                }
                case(400): {
                    const notification = {
                        type: 'warning',
                        message: `Deleted content not found`,
                        autoDismiss: 5000
                    };
                    notifications.add(notification);
                    break;
                }
                case(404): {
                    const notification = {
                        type: 'warning',
                        message: `The collection "${this.props.activeCollection.name}" you are trying to restore deleted content into was not found. It may have been deleted`,
                        autoDismiss: 5000
                    };
                    notifications.add(notification);
                    break;
                }
                case("RESPONSE_ERR"): {
                    const notification = {
                        type: "warning",
                        message: "An error's occurred whilst trying to restore deleted content.",
                        isDismissable: true
                    };
                    notifications.add(notification);
                    break;
                }
                case("UNEXPECTED_ERR"): {
                    const notification = {
                        type: "warning",
                        message: "An unexpected error's occurred whilst trying to restore deleted content.",
                        isDismissable: true
                    };
                    notifications.add(notification);
                    break;
                }
                case("FETCH_ERR"): {
                    const notification = {
                        type: "warning",
                        message: "There's been a network error whilst trying to restore deleted content.",
                        isDismissable: true
                    };
                    notifications.add(notification);
                    break;
                }
            }
            this.setState({isRestoringDeletingContent: false});
            console.error("Error restoring deleted content:\n", error);
        });
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredDeletes = this.state.allDeletedContent.filter(deletedContent => {
            return (
                deletedContent.pageTitle.toLowerCase().search(searchTerm) !== -1
            );
        });
        this.setState({
            filteredDeletedContent: filteredDeletes,
            activeItem: {}
        });
    }

    render() {
        return (
            <div className="grid">
                <div className="modal__header grid">
                    <div className="grid__col-8">
                        <h1 className="modal__title margin-top--2">Select a deletion to restore</h1>
                    </div>
                    <div className="grid__col-4">
                        <Input id="search-deleted-content" onChange={this.handleSearch} label="Search by page title"/>
                    </div>
                </div>
                <div className="modal__body grid__col-12">
                    <SelectableBox
                        isUpdating={this.state.isGettingDeletedContent}
                        rows={this.state.filteredDeletedContent.length ? this.state.filteredDeletedContent : this.state.allDeletedContent}
                        columns={[
                            {heading: "Deleted page and URI", width: "6"},
                            {heading: "No. of deleted pages", width: "3"},
                            {heading: "Date of delete", width: "3"}]}
                        handleItemClick={this.handleItemClick}
                        activeRowID={this.state.activeItem.id}
                    />
                </div>
                <div className="grid__col-12">
                    <div className="add-remove__footer">
                        <button className="btn margin-right--1" onClick={this.props.onClose}>
                            Close
                        </button>

                        <button className="btn btn--primary" onClick={this.handleDoneClick} disabled={!this.state.activeItem.id || this.state.isRestoringDeletingContent}>
                            Done
                        </button>

                        {this.state.isRestoringDeletingContent ? <div className="form__loader loader loader--dark margin-left--1"></div> : ""}
                    </div>
                </div>
            </div>
        )
    }
}

RestoreContent.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        activeCollection: state.state.collections.active,
    }
}

export default connect(mapStateToProps)(RestoreContent);