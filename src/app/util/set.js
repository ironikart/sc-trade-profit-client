import * as expressionActions from '../actions/expressionActions';
import store from '../store';

let exportVersion = 'v1';

let versionImports = {
    'import_v1': function(lines) {
        let name = lines[1];

        if (/^\s*$/.test(name) === true) {
            throw new Error('Name cannot be empty and must be the second line in the import data.');
        }

         // All remaining lines are expressions.
        let expr = lines.slice(2);

        return {
            name,
            expr
        };
    }
};

function importSet(raw) {
    if (typeof raw !== 'string') {
        throw new Error('Expected string of import data for export');
    }

    let lines = raw.split(/\n+/);

    // Filter out comments.
    lines = lines.filter(function(line) {
        if (/^#[^\>]+/.test(line)) {
            return false;
        }
        return true;
    });

    if (lines.length < 4) {
        throw new Error('Import data is not valid');
    }

    let version = lines[0];

    if (/^v[0-9]+$/i.test(version) === false) {
        throw new Error('Import data version must be included as the first line.');
    }

    let versionFnName = 'import_'+version.toLowerCase().trim();

    if (versionImports.hasOwnProperty(versionFnName) === false) {
        throw new Error('Invalid version supplied');
    }

    let importData = versionImports[versionFnName](lines);

    store.dispatch(expressionActions.importSet(importData.name, importData.expr));
}

function exportSet(name, expr) {
    name = name.replace(/\n+/, '');
    let lines = [exportVersion, name];
    expr.forEach((item) => {
        if (item.hasOwnProperty('description')) {
            item.description.forEach((description) => {
                lines.push('#> '+description);
            });
        }

        lines.push(item.assignment.line);

        if (item.hasOwnProperty('conditions')) {
            item.conditions.forEach((condition) => {
                lines.push('  '+condition.logic+' '+(condition.expr || condition.value));
            });
        }
    });
    return lines.join('\n');
}

export { importSet, exportSet };