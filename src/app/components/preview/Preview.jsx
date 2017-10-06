import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    path: PropTypes.string,
    onChange: PropTypes.func
};

const defaultProps = {
    path: "/"
};

export default class Preview extends Component {
    constructor(props) {
        super(props);

        this.bindWindowOnMessage();
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.path === this.props.path) {
            return false;
        }
        return true;
    }

    bindWindowOnMessage() {
        window.addEventListener("message", this.handleIframeMessage, false);
    }

    handleIframeMessage(event) {
        if (event.message !== "load") {
            return;
        }

        this.props.onChange(document.getElementById("iframe").contentWindow.document.location.pathname);
    }

    render() {
        return (
            <div className="preview">
                <iframe id="iframe" className="preview__iframe" src={this.props.path}></iframe>
            </div>
        )
    }
}

Preview.propTypes = propTypes;
Preview.defaultProps = defaultProps;