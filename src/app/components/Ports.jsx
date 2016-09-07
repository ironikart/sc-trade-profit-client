import React from 'react';
import * as c from '../constants';
import Select from 'react-select';

class Ports extends React.Component {

    handleOriginChange(option) {
        this.props.setOrigin(option.value);
    }

    handleDestinationChange(option) {
        this.props.setDestination(option.value);
    }

    handleScopeValueChange(type, e) {
        this.props.updateScopeValue(type, e.target.value);
    }

    render() {
        let systems = [];
        for (var id in c.systems) {
            systems.push({
                label: c.systems[id].name,
                value: id
            });
        }
        systems = systems.sort((a, b) => a.label > b.label ? 1 : 1);

        let path = '';
        if (this.props.origin !== '' && this.props.destination !== '') {
            if (this.props.origin === this.props.destination) {
                path = (
                    <div className="callout">
                        Origin is the same as the destination, no jump calculation is possible.
                    </div>
                );
            } else if (this.props.path.length <= 0) {
                path = (
                    <div className="callout error">
                        No jump route found.
                    </div>
                );
            } else {
                path = (
                    <div className="manifest_route">
                        <h4>Shortest jump route</h4>
                        <p className="box">
                            {this.props.path.map((systemId, i) => {
                                return c.systems[''+systemId].name;
                            }).join(' -- ')}
                        </p>
                    </div>
                );
            }
        }//end if

        return (
            <div className="manifest__ports">
                <h3>Ports</h3>
                <div className="row">
                    <div className="col col-grow">
                        <div className="box">
                            <label htmlFor="manifest__ports-origin">Origin System</label>
                            <Select
                                name="manifest__ports-origin"
                                value={this.props.origin}
                                onChange={this.handleOriginChange.bind(this)}
                                options={systems}
                                clearableValue="false"
                            />
                        </div>
                    </div>
                    <div className="col col-grow">
                        <div className="box">
                            <label htmlFor="manifest__ports-destination">Destination System</label>
                            <Select
                                name="manifest__ports-destination"
                                value={this.props.destination}
                                onChange={this.handleDestinationChange.bind(this)}
                                options={systems}
                                clearableValue="false"
                            />
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
                {path}
            </div>
        );
    }
}//end class

export default Ports;
