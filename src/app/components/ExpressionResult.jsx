import React from 'react';
import Expression from '../util/Expression';

class ExpressionResult extends React.Component {
    constructor(props) {
        super();
        this.expr = new Expression(props.expr);

        this.state = {
            result: 0,
            output: props.output,
            error:  null
        };
    }

    componentDidMount() {
        this.calculate(this.props);
    }

    componentWillReceiveProps(props) {
        this.calculate(props);
    }

    handleError(e) {
        let match = /^Error: Undefined symbol ([a-z0-9]+)/.exec(e);
        let message = e;

        if (match !== null) {
            message = 'Undefined symbol '+match[1]+'. It may have been used before it was defined';
        }

        this.setState({
            error: message
        });

       //this.props.handleError(message);
    }

    calculate(props) {
        this.expr = new Expression(props.expr);

        try {
            let output = this.expr.run(props.scope);

            let result = null;
            if (output.hasOwnProperty(this.state.output) === true) {
                result = Math.floor(output[this.state.output]);
            }

            if (result !== null) {
                this.setState({
                    result: result,
                    error:  null
                });
            }
        } catch (e) {
            this.handleError(e.toString());
        }
    }

    render() {
        let error = '';
        if (this.state.error !== null) {
            error = ( <div className="expressionEditor__result-error callout alert">{this.state.error}</div> );
        }

        let styles = {};

        if (Number.isInteger(this.state.result)) {
            styles.color = 'red';
            if (this.state.result > 0) {
                styles.color = 'green';
            }
        }

        return (
            <div className="expressionEditor__result">
                {error}
                <div className="expressionEditor__result-text">
                    <span>Projected Profit:</span>
                    <span style={styles}> {this.state.result}</span>
                    <span> UEC</span>
                </div>
            </div>
        );
    }
}

export default ExpressionResult;
