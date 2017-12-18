import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DoubleSelectableBoxItem from './DoubleSelectableBoxItem';

const propTypes = {
    headings: PropTypes.array.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstColumn: PropTypes.string.isRequired,
        secondColumn: PropTypes.string.isRequired,
        selectableItem: PropTypes.object.isRequired,
    })).isRequired,
    activeItem: PropTypes.object,
    handleItemClick: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool
};

export default class DoubleSelectableBoxController extends Component {
    constructor(props) {
        super(props);

        this.bindItemClick = this.bindItemClick.bind(this);
    }

    bindItemClick(itemProps) {
        this.props.handleItemClick(itemProps);
    }

    renderList() {
        return (
            <ul className="selectable-box__list grid__col-12">
                {
                    this.props.items.map((item, index) => {
                        return (
                            <DoubleSelectableBoxItem
                                key={index}
                                {...item}
                                isSelected={this.props.activeItem && item.id === this.props.activeItem.id}
                                handleClick={this.bindItemClick}
                            />
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="selectable-box grid">
                <h2 className="selectable-box__heading grid__col-6">
                    { this.props.headings[0] }
                </h2>
                <h2 className="selectable-box__heading grid__col-6 grid__cell">
                    { this.props.headings[1] }
                    { this.props.isUpdating && <span className="selectable-box__status pull-right loader"/> }
                </h2>
                { this.renderList() }
            </div>
        )
    }
}

DoubleSelectableBoxController.propTypes = propTypes;