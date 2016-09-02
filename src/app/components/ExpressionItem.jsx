import React from 'react';
import ExpressionItemTextField from './ExpressionItemTextField.jsx';

class ExpressionItem extends React.Component {
    handleNameChange(ref, value) {
        this.updateExpression(0, value);
    }

    handleExprChange(ref, value) {
        this.updateExpression(1, value);
    }

    updateExpression(index, value) {
        let parts = ['', ''];
        if (this.props.expr.indexOf('=') !== -1) {
            parts = this.props.expr.split('=');
        }
        parts[index] = value;
        this.props.updateExpression(parts.join('='));
    }

    render() {
        let name = 'exprItem'+this.props.index;
        let value = this.props.expr || '';
        let parts = ['', ''];
        if (value.indexOf('=') !== -1) {
            parts = this.props.expr.split('=');
        }

        let nameField = {
            ref:             name+'_name',
            value:           parts[0],
            type:            'text',
            label:           'Assignment name',
            required:        true,
            requiredMessage: 'This field must have a value'
        };

        let exprField = {
            ref:             name+'_expr',
            value:           parts[1],
            type:            'text',
            label:           'Assignment expression',
            required:        true,
            requiredMessage: 'This field must have a value'
        };

        let moveDownButton = '';
        if (this.props.lastIndex !== this.props.index) {
            moveDownButton = (
                <button
                    className="expressionEditor__item-button fi-arrow-down"
                    aria-label="Move Down"
                    onClick={this.props.moveExpressionDown}>
                </button>
            );
        }

        let moveUpButton = '';
        if (this.props.index !== 0) {
            moveUpButton = (
                <button
                    className="expressionEditor__item-button fi-arrow-up"
                    aria-label="Move Up"
                    onClick={this.props.moveExpressionUp}>
                </button>
            );
        }

        let removeButton = '';
        if (parts[0] !== 'total') {
            removeButton = (
                <button
                    className="expressionEditor__item-button fi-x warning"
                    aria-label="Remove"
                    onClick={this.props.removeExpression}>
                </button>
            );
        }

        return (
            <div key={this.props.index} className="expressionEditor__item row">
                <div className="medium-2 columns">
                    <ExpressionItemTextField
                        labelledBy="symbolName"
                        field={nameField}
                        handleChange={this.handleNameChange.bind(this)}
                        handleError={function() {}} />
                </div>
                <div className="medium-7 columns">
                    <ExpressionItemTextField
                        labelledBy="expressionName"
                        field={exprField}
                        handleChange={this.handleExprChange.bind(this)}
                        handleError={function() {}} />
                </div>

                <div className="medium-3 columns">
                    {removeButton}
                    {moveUpButton}
                    {moveDownButton}
                </div>
            </div>
        );
    }
}

export default ExpressionItem;