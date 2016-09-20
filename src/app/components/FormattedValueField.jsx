import React from 'react';
import Field from './Field.jsx';

class FormattedValueField extends Field {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            type: this.props.cutType
        });
    }

    handleToggle() {
        let nextIndex = this.props.types.indexOf(this.state.type) + 1;
        if (nextIndex > this.props.types.length - 1) {
            nextIndex = 0;
        }

        let type = this.props.types[nextIndex];

        this.setState({
            type: type
        });

        this.props.setType(type);

    }

    handleValue(e) {
        this.setValue(e.target.value);
    }

    render() {
        return (
            <div className="formatted-value-field">
                <button className="formatted-value-field__toggle" onClick={this.handleToggle.bind(this)} aria-live={true}>
                    <i className="fi-refresh"></i><span> {this.state.type}</span>
                </button>
                <input
                    aria-labelledby={this.props.field.labelledBy}
                    className="formatted-value-field__input"
                    name={this.props.field.ref}
                    id={this.props.field.ref}
                    type={this.props.field.type}
                    value={this.state.value}
                    onChange={this.handleValue.bind(this)} />
            </div>
        );
    }
}

export default FormattedValueField;