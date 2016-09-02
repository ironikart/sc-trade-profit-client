import React from 'react';
import Field from './Field.jsx';

class ExpressionItemTextField extends Field {
    handleChange(e) {
        this.setValue(e.target.value);
    }

    render() {
        let classNames = ['expressionEditor__item-field'];
        return (
            <input
                aria-labelledby={this.props.labelledBy}
                className={classNames.join(' ')}
                name={this.props.ref}
                id={this.props.ref}
                type={this.props.type}
                aria-label={this.props.label}
                value={this.state.value}
                onChange={this.handleChange.bind(this)} />
        );
    }
}

export default ExpressionItemTextField;