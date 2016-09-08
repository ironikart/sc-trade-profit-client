import React from 'react';
import ExpressionResult from './ExpressionResult.jsx';
import ExpressionItem from './ExpressionItem.jsx';
import ExportExpressionSet from './ExportExpressionSet.jsx';
import ImportExpressionSet from './ImportExpressionSet.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { storeJSON, clear } from '../util/local_store';
import Manifest from './Manifest.jsx';
import Select from 'react-select';

// Disable styles
Tabs.setUseDefaultStyles(false);

class ExpressionEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            set:   this.getCurrentSet(props)
        };
    }

    componentWillMount() {
        // Run an initial calculation.
        this.props.calculate();
    }

    componentWillReceiveProps(props) {
        this.setState({
            set: this.getCurrentSet(props)
        });
    }

    getCurrentSet(props) {
        let currentIndex = props.expressions.currentIndex;
        let sets = props.expressions.sets;
        let currentSet = sets[currentIndex];

        return currentSet;
    }

    handleSetChange(option) {
        this.props.setCurrent(option.value);
        this.props.calculate();
    }

    handleAddSetKeyUp(e) {
        let code = e.keyCode || e.which;
        if (code === 13) {
            this.addSet();
        }
    }

    addSet() {
        let name = this._newSetName.value;
        if (/^\s*$/.test(name) === true) {
            this.setError('Set name cannot be empty.');
        } else {
            this._newSetName.value = '';
            this.props.addSet(name);
        }
    }

    addExpression(exprIndex) {
        let setIndex = this.props.expressions.currentIndex;
        this.props.addExpression(setIndex, exprIndex);
    }

    setError(msg) {
        this.setState({
            error: msg
        });
    }

    clearError() {
        this.setState({
            error: null
        });
    }

    handleSave() {
        storeJSON('expressions', this.props.expressions);
        storeJSON('manifest', this.props.manifest);
        alert('saved');
    }

    handleReset() {
        clear('expressions');
        clear('manifest');
        alert('Saved data reset');
    }

    render() {
        let props = this.props;
        let currentIndex = props.expressions.currentIndex;
        let sets = props.expressions.sets;
        let currentSet = this.state.set;
        let lastExprIndex = currentSet.expr.length - 1;

        let error = '';
        if (this.state.error !== null) {
            error = (
                <div className="alert callout expressionEditor__error" data-closable>
                    <p>{this.state.error}</p>
                    <button onClick={this.clearError.bind(this)} className="close-button" aria-label="Dismiss alert" type="button">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }

        let switcher = (
            <div className="row">
                <div className="col u-1of4">
                    <label htmlFor="changeSet" className="text-right middle">Current Expression Set</label>
                </div>
                <div className="col col-grow">
                    <Select
                        name="expression-switcher"
                        value={currentIndex}
                        onChange={this.handleSetChange.bind(this)}
                        options={sets.map((set, i) => {
                            return {
                                label: set.label,
                                value: i
                            };
                        })}
                        clearableValue="false"
                    />
                </div>
            </div>
        );

        let symbols = [];
        for (var symbolName in this.props.manifest.scope) {
            if (typeof this.props.manifest.scope[symbolName] === 'number') {
                symbols.push({
                    name:  symbolName,
                    value: this.props.manifest.scope[symbolName]
                });
            }
        }

        return (
            <div className="expressionEditor">
                <div className="clearfix expressionEditor__save">
                    <button
                        onClick={this.handleReset.bind(this)}
                        className="button warning float-right">
                        Restore Defaults
                    </button>

                    <button
                        onClick={this.handleSave.bind(this)}
                        className="button success float-right">
                        Save
                    </button>
                </div>
                {error}
                <Tabs>
                    <TabList>
                        <Tab>Cargo</Tab>
                        <Tab>Expressions</Tab>
                        <Tab>New</Tab>
                        <Tab>Export</Tab>
                        <Tab>Import</Tab>
                        <Tab>Delete</Tab>
                    </TabList>
                    <TabPanel>
                        {switcher}
                        <Manifest
                            {...this.props.manifest}
                            addCrew={this.props.addCrew}
                            removeCrew={this.props.removeCrew}
                            updateCrew={this.props.updateCrew}
                            setOrigin={this.props.setOrigin}
                            setDestination={this.props.setDestination}
                            setCurrentShip={this.props.setCurrentShip}
                            addCargo={this.props.addCargo}
                            removeCargo={this.props.removeCargo}
                            updateCargo={this.props.updateCargo} />
                        <ExpressionResult
                            {...this.props.manifest}
                            handleError={this.setError.bind(this)}
                            set={currentSet} />
                    </TabPanel>
                    <TabPanel>
                        {switcher}
                        <div className="callout">
                            <h3>Pre-set symbols</h3>
                            <p>These symbols already exist from the cargo manifest and are available to use (or override) in expressions.</p>
                            <ul>
                            {symbols.map((symbol, i) => {
                                return (
                                    <li key={i}><strong>{symbol.name}</strong> (current value: <span>{symbol.value}</span>)</li>
                                );
                            })}
                            </ul>
                        </div>
                        <div className="section">
                            <h2>Expressions</h2>
                            <table className="data-table" id="expression-table">
                                <thead>
                                    <tr>
                                        <th>Symbol Name</th>
                                        <th>Expression</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="expressionEditor__items">
                                    {currentSet.expr.map((expr, i) => {
                                        return ( 
                                            <ExpressionItem
                                            key={i}
                                            expr={expr}
                                            updateDescription={props.updateDescription.bind(this, currentIndex, i)}
                                            updateExpression={props.updateExpression.bind(this, currentIndex, i)}
                                            removeExpression={props.removeExpression.bind(this, currentIndex, i)}
                                            moveExpressionUp={props.moveExpression.bind(this, currentIndex, i, 'up')}
                                            moveExpressionDown={props.moveExpression.bind(this, currentIndex, i, 'down')}
                                            lastIndex={lastExprIndex} />
                                        );
                                    })}
                                </tbody>
                            </table>
                            <p>
                                <button
                                    className="button"
                                    aria-label="Insert expression"
                                    onClick={this.addExpression.bind(this, currentSet.expr.index)}>
                                    Add new expression
                                </button>
                            </p>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {switcher}
                        <div className="section">
                            <h3>Create a new expression set.</h3>
                            <label htmlFor="newSetName" className="input-group-label">Set Name</label>
                            <div>
                                <input
                                    className="input-group-field"
                                    type="text"
                                    onKeyUp={this.handleAddSetKeyUp.bind(this)}
                                    placeholder="New set name"
                                    aria-label="New set name"
                                    name="newSetName"
                                    id="newSetName"
                                    ref={(node) => this._newSetName= node}
                                    defaultValue="" />
                            </div>
                            <p>
                                <button className="button success" onClick={this.addSet.bind(this)}>Add</button>
                            </p>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {switcher}
                        <ExportExpressionSet currentSet={currentSet} setError={this.setError.bind(this)} />
                    </TabPanel>
                    <TabPanel>
                        {switcher}
                        <ImportExpressionSet {...this.props} setError={this.setError.bind(this)} />
                        }
                    </TabPanel>
                    <TabPanel>
                        <div className="section">
                            <h3>Delete expression set</h3>
                            {switcher}
                            <button className="button alert" onClick={props.removeSet.bind(this, currentIndex)}>
                                <i className="fi-trash"></i>
                                <span> Remove this set</span>
                            </button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default ExpressionEditor;
