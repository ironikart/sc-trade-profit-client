import React from 'react';

class ExpressionResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
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
    }

    render() {
        let total = 0;
        let set = this.props.set;
        if (this.props.result !== null && this.props.result.hasOwnProperty(set.output) === true) {
            total = this.props.result[set.output];
        }

        let error = '';
        if (this.state.error !== null) {
            error = ( <div className="expressionEditor__result-error callout alert">{this.state.error}</div> );
        }

        let styles = {};

        if (Number.isInteger(total)) {
            styles.color = 'red';
            if (total > 0) {
                styles.color = 'green';
            }
        }

        return (
            <div className="expressionEditor__result">
                {error}
                <div className="expressionEditor__result-text">
                    <span>Projected Profit:</span>
                    <span style={styles}> {total}</span>
                    <span> UEC</span>
                </div>
            </div>
        );
    }
}

export default ExpressionResult;
