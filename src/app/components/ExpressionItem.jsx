import React from 'react';
import ExpressionItemTextField from './ExpressionItemTextField.jsx';
import assign from 'object.assign';

class ExpressionItem extends React.Component {
    handleSymbolChange(ref, value) {
        this.updateExpression('symbol', value);
    }

    handleExprChange(ref, value) {
        this.updateExpression('expr', value);
    }

    updateExpression(type, value) {
        let changedExpr = assign({}, this.props.expr);
        if (type === 'symbol') {
            changedExpr.assignment.symbol = value;
        } else if (type === 'expr') {
            changedExpr.assignment.expr = value;
        }

        this.props.updateExpression(changedExpr);
    }

    render() {
        let name = 'exprItem'+this.props.index;
        let symbol = this.props.expr.assignment.symbol;
        let value = this.props.expr.assignment.expr;

        let nameField = {
            ref:             name+'_name',
            value:           symbol,
            type:            'text',
            label:           'Assignment name',
            required:        true,
            requiredMessage: 'This field must have a value'
        };

        let exprField = {
            ref:             name+'_expr',
            value:           value,
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
        let symbolField = ( <p>{symbol}</p> );
        if (symbol !== 'total') {
            removeButton = (
                <button
                    className="expressionEditor__item-button fi-x warning"
                    aria-label="Remove"
                    onClick={this.props.removeExpression}>
                </button>
            );
            symbolField = (
                <ExpressionItemTextField
                    labelledBy="symbolName"
                    field={nameField}
                    handleChange={this.handleSymbolChange.bind(this)}
                    handleError={function() {}} />
            );
        }

        return (
            <div key={this.props.index} className="expressionEditor__item row">
                <div className="medium-2 columns">
                    {symbolField}
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