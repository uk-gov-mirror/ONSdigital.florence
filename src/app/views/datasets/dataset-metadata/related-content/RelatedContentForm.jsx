import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../components/Input';

const propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string,
        error: PropTypes.string
    }),
    name: PropTypes.string.isRequired,
    isPosting: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onFormInput: PropTypes.func.isRequired
}

class RelatedContentForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form" onSubmit={this.props.onFormSubmit}>
                <div className="modal__header">
                    <h2> Add related content: </h2>
                </div>
                <div className="modal__body">
                    <div className="form__input">
                        <Input 
                            type="text"
                            label="Page Title"
                            id="add-related-content-title"
                            name="add-related-content-title"
                            onChange={this.props.onFormInput}
                            onCancel={this.props.onCancel}
                            isFocused={true}
                        />
                        <Input 
                            type="text"
                            label="Page URL"
                            id="add-related-content-url"
                            name="add-related-content-url"
                            onChange={this.props.onFormInput}
                            onCancel={this.props.onCancel}
                        />
                    </div>
                    <div className="modal__footer">
                    <button disabled={this.props.isPosting} className={"btn btn--primary btn--margin-right"}>Add</button>
                    <button type="button" disabled={this.props.isPosting} className="btn" onClick={this.props.onCancel}>Cancel</button>
                    {this.props.isPosting && 
                        <div className="loader"></div>
                    }
                </div>
                </div>
            </form>
        )
    }
}

RelatedContentForm.propTypes = propTypes;

export default RelatedContentForm;