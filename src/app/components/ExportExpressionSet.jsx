import React from 'react';
import { exportSet } from '../util/set.js';

class ExportExpressionSet extends React.Component {

    copyExportToClipboard() {
        this._export.select();
        let successful = document.execCommand('copy');
        if (!successful) {
            this.setState({
                error: 'Unable to copy, your browser may not support it.'
            });
        } else {
            alert('Copied!');
        }
    }

    render() {
        // Automatically export the data each time this is rendered.
        let exported = exportSet(this.props.currentSet);

        return (
            <div className="expressionEditor__export">
                <h2>Export</h2>
                <p>You can add comments by prefixing lines with a <em>#</em> symbol (copy and paste into text editor).</p>
                <textarea id="exportSet" ref={(elem) => this._export = elem} rows="10" cols="50" value={exported} readOnly={true}></textarea>
                <button className="button align-right" onClick={this.copyExportToClipboard.bind(this)}>
                    <i className="fi-clipboard"></i>
                    <span>Copy</span>
                </button>
            </div>
        );
    }
}

export default ExportExpressionSet;