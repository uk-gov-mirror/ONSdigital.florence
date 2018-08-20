import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import users from '../../utilities/api-clients/user';
import notifications from '../../utilities/notifications';
import log, {eventTypes} from '../../utilities/log';

import SelectableBox from '../../components/selectable-box-new/SelectableBox';
import UsersCreateController from './create/UsersCreateController';

const propTypes = {
    rootPath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element
};

export class UsersController extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFetchingUsers: false,
            allUsers: [],
            selectedUser: null
        }

        this.handleUserSelection = this.handleUserSelection.bind(this)
    }

    componentWillMount() {
        return this.getAllUsers();
    }

    getAllUsers() {
        this.setState({isFetchingUsers: true})
        return users.getAll()
            .then(allUsersResponse => {
                const allUsers = allUsersResponse.map(user => {
                    return this.mapUserToState(user)
                })
                this.setState({allUsers, isFetchingUsers: false})
            }).catch(error => {
                this.setState({isFetchingUsers: false})
                switch(error) {
                    case(404): {
                        const notification = {
                            type: 'warning',
                            message: `No API route available to get users.`,
                            autoDismiss: 5000
                        };
                        notifications.add(notification);
                        break;
                    }
                    case("RESPONSE_ERR"): {
                        const notification = {
                            type: "warning",
                            message: "An error's occurred whilst trying to get users. You may only be able to see previously loaded information.",
                            isDismissable: true
                        };
                        notifications.add(notification);
                        break;
                    }
                    case("UNEXPECTED_ERR"): {
                        const notification = {
                            type: "warning",
                            message: "An unexpected error's occurred whilst trying to get users. You may only be able to see previously loaded information.",
                            isDismissable: true
                        };
                        notifications.add(notification);
                        break;
                    }
                    case("FETCH_ERR"): {
                        const notification = {
                            type: "warning",
                            message: "There's been a network error whilst trying to get users. You may only be able to see previously loaded information.",
                            isDismissable: true
                        };
                        notifications.add(notification);
                        break;
                    }
                    default: {
                        const notification = {
                            type: "warning",
                            message: "An unexpected error's occurred whilst trying to get users. You may only be able to see previously loaded information.",
                            isDismissable: true
                        };
                        notifications.add(notification);
                        break;
                    }
                }
                console.error("Error getting all users:\n", error);
            })
            
    }

    mapUserToState(user) {
        try {
            const id = user.email;
            const columnValues = [user.name, user.email]
            const returnValue = {id: user.email}
            return {...user, id, columnValues, returnValue};
        } catch(error) {
            const notification = {
                type: "warning",
                message: "Error mapping users to component state",
                isDismissable: true,
                autoDismiss: 3000
            }
            notifications.add(notification);
            console.error("Error mapping users to component state: ", error);
            log.add(eventTypes.unexpectedRuntimeError, {message: `Error mapping users to component state:\n${JSON.stringify(error)}`});
            return false;
        }
    }

    handleUserSelection(user) {
        this.setState({selectedUser: user.id});
        this.props.dispatch(push(`${this.props.rootPath}/users/${user.id}`));
    }

    render() {
        return (
            <div>
                <div className="grid grid--justify-space-around">
                        <div className="grid__col-4">
                            <h1>Select a user</h1>
                            <SelectableBox 
                                columns={[{heading: "User", width: "6"}, {heading: "Email", width: "6"}]}
                                rows={this.state.allUsers}
                                isUpdating={this.state.isFetchingUsers}
                                handleItemClick={this.handleUserSelection}
                                activeRowID={this.state.selectedUser}
                            />
                        </div>
    
                        <div className="grid__col-4">
                            <h1>Create a user</h1>
                            <UsersCreateController />
                        </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

UsersController.propTypes = propTypes;

export function mapStateToProps(state) {
    return {
        rootPath: state.state.rootPath
    }
}

export default connect(mapStateToProps)(UsersController);