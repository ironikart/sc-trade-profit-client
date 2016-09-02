import React from 'react';
import Cargo from './Cargo.jsx';
import assign from 'object.assign';

class Manifest extends React.Component {
    constructor(props) {
        super(props);

        this.state = assign(
            {
                jumps: 0
            },
            this.getShipState(props.matrix, props.currentShipId)
        );
    }

    componentDidMount() {
        this.props.updateScope(this.state);
    }

    componentWillReceiveProps(props) {
        let shipState = this.getShipState(props.matrix, props.currentShipId);
        this.setState(shipState);
    }

    getShipState(matrix, currentid) {
        let state = {};
        matrix.forEach((ship) => {
            if (ship.id === currentid) {
                state = (ship);
            }
        });
        return state;
    }

    handleOriginChange(e) {
        this.props.setOrigin(e.target.value);
    }

    handleDestinationChange(e) {
        this.props.setDestination(e.target.value);
    }

    handleJumpsChange(e) {
        this.setState({
            jumps: parseFloat(e.target.value)
        });
    }

    handleShipSelect(e) {
        let id = parseFloat(e.target.value);
        this.props.setCurrentShip(id);
        //this.updateShip(this.props.matrix, id);
    }

    handleCargoCapacity(e) {
        this.setState({
            cargocapacity: parseFloat(e.target.value)
        });
    }

    handleMass(e) {
        this.setState({
            mass: parseFloat(e.target.value)
        });
    }

    updateScope(scope) {
        let newScope = assign({}, this.state, scope);

        // Push the scope further upstream.
        this.props.updateScope(newScope);
    }

    render() {
        return (
            <div className="manifest">
                <h3>Ship</h3>
                <div className="manifest__ship row">
                    <div className="medium-8 columns">
                        <label htmlFor="manifest__ship-select">Select Ship</label>
                        <select
                            name="manifest__ship-select"
                            id="manifest__ship-select"
                            value={this.props.currentShipId}
                            onChange={this.handleShipSelect.bind(this)}>
                            {this.props.matrix
                                .sort((a, b) => a.name > b.name ? 1 : -1)
                                .map((ship, i) => {
                                return (
                                    <option key={i} value={ship.id}>{ship.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="medium-2 columns">
                        <label htmlFor="manifest__ship-cargo">Cargo Capacity</label>
                        <input
                            type="text"
                            value={this.state.cargocapacity}
                            id="manifest__ship-cargo"
                            name="manifest__ship-cargo"
                            onChange={this.handleCargoCapacity.bind(this)}
                            />
                    </div>
                    <div className="medium-2 columns">
                        <label htmlFor="manifest__ship-mass">Mass</label>
                        <input
                            type="text"
                            value={this.state.mass}
                            id="manifest__ship-mass"
                            name="manifest__ship-mass"
                            onChange={this.handleMass.bind(this)}
                            />
                    </div>
                </div>
                <h3>Ports</h3>
                <div className="manifest__ports row">
                    <div className="medium-5 columns">
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
                    <div className="medium-5 columns">
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
                    <div className="medium-2 columns">
                        <label>Jumps
                            <input
                                type="number"
                                name="manifest_ports-jumps"
                                id="manifest__ports-jumps"
                                value={this.state.jumps}
                                onChange={this.handleJumpsChange.bind(this)}
                            />
                        </label>
                    </div>
                </div>
                <h3>Cargo</h3>
                <Cargo
                    cargo={this.props.cargo}
                    addCargo={this.props.addCargo}
                    removeCargo={this.props.removeCargo}
                    updateCargo={this.props.updateCargo}
                    updateScope={this.updateScope.bind(this)} />
            </div>
        );
    }
}

export default Manifest;