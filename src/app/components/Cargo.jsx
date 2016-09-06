import React from 'react';

class Cargo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cargo: props.cargo
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            cargo: props.cargo
        });
    }

    isEmptyValue(value) {
        return /^\s*$/.test(''+value);
    }

    addCargo() {
        let cargo = this.props.cargo;

        let item = {
            name:     'Widget #'+(cargo.length + 1),
            buy:      0,
            sell:     0,
            quantity: 0,
            mass:     0
        };

        this.props.addCargo(item.name, item.buy, item.sell, item.quantity, item.mass);
    }

    updateCargoItem(type, index, e) {
        let value = e.target.value;

        if (type !== 'name' && /^[0-9]*?\.?[0-9]{1,}$/.test(value) === true) {
            value = parseFloat(value);
        }

        this.props.updateCargo(index, type, value);
    }

    removeCargoItem(index) {
        this.props.removeCargo(index);
    }

    render() {
        return (
            <div className="manifest__cargo">
                <h3>Cargo</h3>
                <table id="cargo" className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Buy <em>(at origin)</em></th>
                            <th>Sell <em>(at dest)</em></th>
                            <th>Quantity</th>
                            <th>Mass (per item)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.cargo.map((cargo, i) => {
                        return (
                            <tr key={i}>
                                <td width="30%">
                                    <input
                                        type="text"
                                        onChange={this.updateCargoItem.bind(this, 'name', i)}
                                        value={cargo.name}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={this.updateCargoItem.bind(this, 'buy', i)}
                                        value={cargo.buy}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={this.updateCargoItem.bind(this, 'sell', i)}
                                        value={cargo.sell}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        onChange={this.updateCargoItem.bind(this, 'quantity', i)}
                                        value={cargo.quantity}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={this.updateCargoItem.bind(this, 'mass', i)}
                                        value={cargo.mass}
                                    />
                                </td>
                                <td>
                                    <button className="alert button" onClick={this.removeCargoItem.bind(this, i)}>Remove</button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Totals:</th>
                            <td><span className="uec">{this.props.scope.totalBuy}</span></td>
                            <td><span className="uec">{this.props.scope.totalSell}</span></td>
                            <td></td>
                            <td>{this.props.scope.totalMass} tons</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <button className="button" onClick={this.addCargo.bind(this)}><i className="fi-plus"></i> Add Cargo</button>
            </div>
        );
    }
}

export default Cargo;