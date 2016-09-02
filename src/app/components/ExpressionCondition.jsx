import React from 'react';
import ExpressionConditionItem from './ExpressionConditionItem.jsx';

class ExpressionCondition extends React.Component {
    getOptions() {
        let expr = this.props.expr;
        let exprIndex = this.props.exprIndex;
        let options = expr
        .slice(0, exprIndex)
        .filter((line) => {
            if (line.indexOf('=') === -1) {
                return true;
            }
            return false;
        })
        .map((line) => {
            return line.split('=').shift();
        })
        .map((option, i) => {
            return (
                <option key={i} value={option}>{option}</option>
            );
        });

        return options;
    }

    render() {
        let conditions = this.props.conditions;
        let options = this.getOptions();

        return (
            <div className="expressionEditor__item-conditions">
                {conditions.map((condition, i) => {
                    return (
                        <ExpressionConditionItem
                            index={i}
                            exprIndex={this.props.exprIndex}
                            condition={condition}
                            options={options}
                        />
                    );
                })}
            </div>
        );
    }
}

export default ExpressionCondition;