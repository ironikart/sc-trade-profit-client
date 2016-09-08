import React from 'react';
import * as c from '../constants';
import Select from 'react-select';

class Ship extends React.Component {

    componentDidMount() {
        this.props.setCurrentShip(this.props.currentShipId);
    }

    handleShipSelect(option) {
        let id = parseFloat(option.value);
        if (Number.isNaN(id) === false) {
            this.props.setCurrentShip(id);
        }
    }

    handleScopeValueChange(type, e) {
        this.props.updateScopeValue(type, e.target.value);
    }

    render() {
        let ships = c.matrix
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .map((ship) => {
            return {
                label: ship.name,
                value: ship.id
            };
        });

        return (
            <div className="manifest__ship section">
                <h3>Ship</h3>
                <div className="row">
                    <div className="col col-grow">
                        <div className="box">
                            <label htmlFor="manifest__ship-select">Select Ship</label>
                            <Select
                                name="manifest__ship-select"
                                value={this.props.currentShipId}
                                onChange={this.handleShipSelect.bind(this)}
                                options={ships}
                                clearableValue="false"
                            />
                        </div>
                    </div>
                    <div className="col u-1of6">
                        <div className="box">
                            <label htmlFor="manifest__ship-cargo">Cargo Capacity</label>
                            <input
                                type="text"
                                value={this.props.scope.shipCargoCapacity}
                                id="manifest__ship-cargo"
                                name="manifest__ship-cargo"
                                onChange={this.handleScopeValueChange.bind(this, 'shipCargoCapacity')}
                                />
                            </div>
                    </div>
                    <div className="col u-1of6">
                        <div className="box">
                            <label htmlFor="manifest__ship-mass">Mass</label>
                            <input
                                type="text"
                                value={this.props.scope.shipMass}
                                id="manifest__ship-mass"
                                name="manifest__ship-mass"
                                onChange={this.handleScopeValueChange.bind(this, 'shipMass')}
                                />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}//end class

export default Ship;
