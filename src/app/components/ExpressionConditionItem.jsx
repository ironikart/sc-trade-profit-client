import React from 'react';

class ExpressionConditionItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.parseCondition(props.condition);

        this._operators = ['>', '<', '>=', '<=', '==='];
    }

    componentWillReceiveProps(props) {
        this.setState(this.parseCondition(props.condition));
    }

    parseCondition(condition) {
        let pattern = '\s+(AND|OR)\s+([a-z\-\_]+)\s+(';
        pattern += this.operators.join('|');
        pattern += ')\s+([a-z0-9\-\_]+)';

        let expr = new RegExp(pattern, 'i');
        let match = expr.exec(condition);

        let assignment = '';
        let operator = '>';
        let value = '';
        if (match !== null) {
            assignment = match[2];
            operator = match[3];
            value = match[4];
        }

        return {
            assignment,
            operator,
            value
        };
    }

    handleOperatorChange(e) {
        let operator = e.target.selectedIndex;
        this.setState({
            operator: operator
        });
    }

    handleAssignmentChange(e) {
        let assignment = e.target.selectedIndex;
        this.setState({
            assignment: assignment
        });
    }

    handleValueInput(e) {
        let value = e.target.value;
        this.setState({
            value: value
        });
    }

    render() {
        return (
            <div key={this.props.index} className="expressionEditor__item-condition row">
                <div className="medium-3 columns text-right">
                    IF
                </div>
                <div className="medium-3 columns">
                    <select
                        aria-label="Condition assignment"
                        onChange={this.handleAssignmentChange.bind(this)}
                        id={'condition_assignment_'+this.props.exprIndex+'_'+this.props.index}>
                        {this.props.options}
                    </select>
                </div>
                <div className="medium-2 columns">
                    <select
                        aria-label="Condition operator"
                        onChange={this.handleOperatorChange.bind(this)}
                        id={'condition_operator_'+this.props.exprIndex+'_'+this.props.index}
                        value={this.state.operator}>
                        {this._operators.map((op, j) => {
                            return (
                                <option key={j} value={op}>{op}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="medium-3 columns">
                    <input
                        type="text"
                        id={'condition_value_'+this.props.exprIndex+'_'+this.props.index}
                        aria-label="Condition value"
                        onChange={this.handleValueInput.bind(this)}
                        ref={(elem) => this._input = elem}
                        value={this.state.value} />
                </div>
                <div className="medium-1 columns">
                    <button className="fi-times" aria-label="Remove"></button>
                </div>
            </div>
        );
    }
}

export default ExpressionConditionItem;