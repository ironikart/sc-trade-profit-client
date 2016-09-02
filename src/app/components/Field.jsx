import React, { PropTypes } from 'react';

let fieldProps = PropTypes.shape({
    ref:     PropTypes.string.isRequired,
    label:   PropTypes.string.isRequired,
    type:    PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired
    }).isRequired),
    value:           PropTypes.any,
    error:           PropTypes.string,
    requiredMessage: PropTypes.string,
    required:        PropTypes.boolean
}).isRequired;

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.field.value,
            error: props.field.error
        };
    }

    setValue(value) {
        this.setState({
            value: value
        });

        // Pass to an external handler
        if (this.props.handleChange) {
            this.props.handleChange(this.props.field.ref, value);
        }
    }

    setError(msg) {
        this.setState({
            error: msg
        });
        // Pass to an external handler
        if (this.props.handleError) {
            this.props.handleError(this.props.field.ref, msg);
        }
    }

    componentWillReceiveProps(props) {
        // Push any new error or value props into the state
        this.setState({
            error: props.field.error,
            value: props.field.value
        });
    }
}

Field.propTypes = {
    field:        fieldProps,
    handleChange: PropTypes.func.isRequired,
    handleError:  PropTypes.func.isRequired
};

export default Field;