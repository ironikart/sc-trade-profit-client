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
                    className="icon-button fi-arrow-down"
                    aria-label="Move Down"
                    onClick={this.props.moveExpressionDown}>
                </button>
            );
        }

        let moveUpButton = '';
        if (this.props.index !== 0) {
            moveUpButton = (
                <button
                    className="icon-button fi-arrow-up"
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
                    className="icon-button fi-x alert"
                    aria-label="Remove"
                    onClick={this.props.removeExpression}>
                </button>
            );
            symbolField = (
                <ExpressionItemTextField
                    type="text"
                    labelledBy="symbolName"
                    field={nameField}
                    handleChange={this.handleSymbolChange.bind(this)}
                    handleError={function() {}} />
            );
        }

        let description = this.props.expr.description.join('\n');

        return (
            <tr key={this.props.index} className="expressionEditor__item">
                <td>
                    {symbolField}
                </td>
                <td>
                    <ExpressionItemTextField
                        type="text"
                        labelledBy="expressionName"
                        field={exprField}
                        handleChange={this.handleExprChange.bind(this)}
                        handleError={function() {}} />

                    <div className="expressionEditor__item-description">
                        <label htmlFor={'expressionEditor__item-description'+this.props.index}>Description</label>
                        <textarea
                            id={'expressionEditor__item-description'+this.props.index}
                            rows="4"
                            cols="50"
                            value={description}
                            ref={(elem) => this._description = elem}
                            onChange={this.handleDescriptionChange.bind(this)}>
                        </textarea>
                    </div>
                </td>

                <td>
                    {removeButton}
                    {moveUpButton}
                    {moveDownButton}
                </td>
            </tr>
        );
    }
}

export default ExpressionItem;