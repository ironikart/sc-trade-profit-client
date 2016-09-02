import React from 'react';
import assign from 'object.assign';

class Cargo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cargo:         props.cargo,
            totalBuy:      0,
            totalSell:     0,
            totalMass:     0,
            totalQuantity: 0
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            cargo: props.cargo
        });
    }

    componentDidMount() {
        this.calculate();
    }

    isEmptyValue(value) {
        return /^\s*$/.test(''+value);
    }

    calculate() {
        let total = {
            totalBuy:      0,
            totalSell:     0,
            totalMass:     0,
            totalQuantity: 0
        };

        this.state.cargo.forEach((item) => {
            let quantity = 0;
            if (Number.isNaN(item.quantity) === false && item.quantity !== '') {
                quantity = parseInt(item.quantity, 10);
            }

            if (Number.isNaN(item.buy) === false && item.buy !== '') {
                total.totalBuy += quantity * parseInt(item.buy, 10);
            }

            if (Number.isNaN(item.sell) === false && item.sell !== '') {
                total.totalSell += quantity * parseInt(item.sell, 10);
            }

            if (Number.isNaN(item.mass) === false && item.mass !== '') {
                total.totalMass += quantity * parseFloat(item.mass);
            }

            total.totalQuantity += quantity;
        });

        this.setState(assign(this.state, total));

        this.props.updateScope(total);
    }

    addCargo() {
        let cargo = this.state.cargo;

        cargo.push({
            name:     'Widget #'+(cargo.length + 1),
            buy:      0,
            sell:     0,
            quantity: 0,
            mass:     0
        });

        this.setState({
            cargo: cargo
        });

        this.calculate();
    }

    updateCargoItem(type, index, e) {
        let value = e.target.value;

        if (type !== 'name' && /^[0-9]*?\.?[0-9]{1,}$/.test(value) === true) {
            value = parseFloat(value);
        }

        this.props.updateCargo(index, type, value);
        this.calculate();
    }

    removeCargoItem(index) {
        this.props.removeCargo(index);
        this.calculate();
    }

    render() {
        return (
            <div className="manifest__cargo">
                <table id="cargo">
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
                            <td>Totals:</td>
                            <td>{this.state.totalBuy} UEC</td>
                            <td>{this.state.totalSell} UEC</td>
                            <td></td>
                            <td>{this.state.totalMass} tons</td>
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