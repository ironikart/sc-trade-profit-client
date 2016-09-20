import { parse } from './expression';

let exportVersion = 'v2';

let versionImports = {
    'import_v1': function(lines) {
        let name = lines[1];

        if (/^\s*$/.test(name) === true) {
            throw new Error('Name cannot be empty and must be the second line in the import data.');
        }

         // All remaining lines are expressions.
        let expr = parse(lines.slice(2));

        return {
            label: name,
            expr
        };
    },

    'import_v2': function(lines) {
        let name = lines[1];

        if (/^\s*$/.test(name) === true) {
            throw new Error('Name cannot be empty and must be the second line in the import data.');
        }

        // Separate EXPORTS from expressions.
        let expr = [];
        let output = [];
        lines.slice(2).forEach((line) => {
            if (line.indexOf('EXPORT') === 0) {
                let match = /^EXPORT ([A-Z0-9\-\_+]) as "([^"]+)"/i.exec(line);
                if (match !== null) {
                    output.push([match[1], match[2]]);
                }
            } else {
                expr.push(line);
            }
        });

        expr = parse(expr);

        return {
            label: name,
            expr,
            output
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

    return importData;
}

function exportSet(set) {
    let name = set.label.replace(/\n+/, '');
    let lines = [exportVersion, name];
    set.expr.forEach((item) => {
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
    set.output.forEach((item) => {
        lines.push('EXPORT '+item[0]+' as "'+item[1]+'"');
    });
    return lines.join('\n');
}

export { importSet, exportSet };