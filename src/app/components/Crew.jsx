import React from 'react';

class Crew extends React.Component {

    addCrew() {
        this.props.addCrew();
    }

    removeCrew(index) {
        this.props.removeCrew(index);
    }

    updateCrew(prop, index, e) {
        this.props.updateCrew(index, prop, e.target.value);
    }

    render() {
        return (
            <div className="manifest__crew">
                <h3>Crew</h3>
                <table id="crew" className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cut</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.crew.map((crew, i) => {
                        return (
                            <tr key={i}>
                                <td width="80%">
                                    <input
                                        type="text"
                                        onChange={this.updateCrew.bind(this, 'name', i)}
                                        value={crew.name}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={this.updateCrew.bind(this, 'cut', i)}
                                        value={crew.cut}
                                    />
                                </td>
                                <td>
                                    <button className="alert button" onClick={this.removeCrew.bind(this, i)}>Remove</button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Totals:</th>
                            <td><span className="uec">{this.props.scope.crewCut}</span></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <button className="button" onClick={this.addCrew.bind(this)}><i className="fi-plus"></i> Add Crew</button>
            </div>
        );
    }
}

export default Crew;