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

    getTextStyle(num) {
        let styles = {};
        if (Number.isInteger(num)) {
            styles.color = 'red';
            if (num > 0) {
                styles.color = 'green';
            }
        }
        return styles;
    }

    render() {
        let total = 0;
        let set = this.props.set;
        let keysToShow = set.output;

        let error = '';
        if (this.state.error !== null) {
            error = ( <div className="expressionEditor__result-error callout alert">{this.state.error}</div> );
        }

        let tmpl;
        if (this.props.result !== null && this.props.cargo.length >= 1) {
            tmpl = (
                <div className="expressionEditor__result-text">
                    <h3>Estimated Profit</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keysToShow.map((keyMap, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{keyMap[1]}</td>
                                        <td className="text-right">
                                            <span
                                                style={this.getTextStyle(this.props.result[keyMap[0]])}
                                                className="uec">{this.props.result[keyMap[0]]}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

               </div>
            );
        } else {
            tmpl = (
                <div className="expressionEditor__result-text">
                    <h3>Estimated Profit</h3>
                    <p>Add cargo and associated values to estimate profits.</p>
                </div>
            );
        }

        return (
            <div className="expressionEditor__result">
                {error}
                {tmpl}
            </div>
        );
    }
}

export default ExpressionResult;
