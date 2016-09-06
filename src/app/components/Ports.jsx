import React from 'react';

class Ports extends React.Component {

    handleOriginChange(e) {
        this.props.setOrigin(e.target.value);
    }

    handleDestinationChange(e) {
        this.props.setDestination(e.target.value);
    }

    handleScopeValueChange(type, e) {
        this.props.updateScopeValue(type, e.target.value);
    }

    render() {
        return (
            <div className="manifest__ports">
                <h3>Ports</h3>
                <div className="row">
                    <div className="col col-grow">
                        <div className="box">
                            <label htmlFor="manifest__ports-origin">Origin System</label>
                            <select
                                name="manifest__ports-origin"
                                id="manifest__ports-origin"
                                value={this.props.origin}
                                onChange={this.handleOriginChange.bind(this)}>
                                {this.props.systems
                                    .sort((a, b) => a > b ? 1 : -1)
                                    .map((system, i) => {
                                    return (
                                        <option key={i} value={system}>{system}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col col-grow">
                        <div className="box">
                            <label htmlFor="manifest__ports-destination">Destination System</label>
                            <select
                                name="manifest__ports-destination"
                                id="manifest__ports-destination"
                                value={this.props.destination}
                                onChange={this.handleDestinationChange.bind(this)}>
                                {this.props.systems
                                    .sort((a, b) => a > b ? 1 : -1)
                                    .map((system, i) => {
                                    return (
                                        <option key={i} value={system}>{system}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col col-shrink u-1of8">
                        <div className="box">
                            <label>Jumps
                                <input
                                    type="number"
                                    name="manifest_ports-jumps"
                                    id="manifest__ports-jumps"
                                    value={this.props.scope.jumps}
                                    onChange={this.handleScopeValueChange.bind(this, 'jumps')}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}//end class

export default Ports;
