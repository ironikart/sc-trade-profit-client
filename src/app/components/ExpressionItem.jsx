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

    handleDescriptionChange() {
        let values = this._description.value.split(/\n+/);
        this.props.updateDescription(values);
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

        let description = this.props.expr.description.join('\n');

        return (
            <div key={this.props.index} className="expressionEditor__item row">
                <div className="col u-1of6">
                    <div className="box">
                        {symbolField}
                    </div>
                </div>
                <div className="col col-grow">
                    <div className="box">
                        <ExpressionItemTextField
                            labelledBy="expressionName"
                            field={exprField}
                            handleChange={this.handleExprChange.bind(this)}
                            handleError={function() {}} />

                        <div className="expressionEditor__item-description">
                            <textarea
                                rows="4"
                                cols="50"
                                value={description}
                                ref={(elem) => this._description = elem}
                                onChange={this.handleDescriptionChange.bind(this)}>
                            </textarea>
                        </div>
                    </div>
                </div>

                <div className="col u-1of6">
                    <div className="box">
                        {removeButton}
                        {moveUpButton}
                        {moveDownButton}
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpressionItem;