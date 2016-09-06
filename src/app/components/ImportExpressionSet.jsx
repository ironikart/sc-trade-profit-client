import React from 'react';
import { importSet } from '../util/set.js';

class ImportExpressionSet extends React.Component {

    handleImport() {
        try {
            importSet(this._import.value);
            this._import.value = '';
        } catch (e) {
            this.props.setError(e.toString());
        }
    }

    render() {
        return (
            <div className="expressionEditor__import">
                <h2>Import</h2>
                <p>Import a set by pasting the pre-formatted text here.</p>
                <div>
                    <textarea id="importSet" ref={(elem) => this._import = elem} rows="10" cols="50"></textarea>
                </div>
                <button onClick={this.handleImport.bind(this)} className="button">Import</button>
            </div>
        );
    }
}

export default ImportExpressionSet;