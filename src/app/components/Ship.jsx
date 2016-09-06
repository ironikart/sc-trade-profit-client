import React from 'react';

class Ship extends React.Component {

    componentDidMount() {
        this.props.setCurrentShip(this.props.currentShipId);
    }

    handleShipSelect(e) {
        let id = parseFloat(e.target.value);
        this.props.setCurrentShip(id);
    }

    handleScopeValueChange(type, e) {
        this.props.updateScopeValue(type, e.target.value);
    }

    render() {
        return (
            <div className="manifest__ship">
                <h3>Ship</h3>
                <div className="row">
                    <div className="col col-grow">
                        <div className="box">
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
