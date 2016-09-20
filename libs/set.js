'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exportSet = exports.importSet = undefined;

var _expression = require('./expression');

var exportVersion = 'v2';

var versionImports = {
    'import_v1': function import_v1(lines) {
        var name = lines[1];

        if (/^\s*$/.test(name) === true) {
            throw new Error('Name cannot be empty and must be the second line in the import data.');
        }

        // All remaining lines are expressions.
        var expr = (0, _expression.parse)(lines.slice(2));

        return {
            label: name,
            expr: expr
        };
    },

    'import_v2': function import_v2(lines) {
        var name = lines[1];

        if (/^\s*$/.test(name) === true) {
            throw new Error('Name cannot be empty and must be the second line in the import data.');
        }

        // Separate EXPORTS from expressions.
        var expr = [];
        var output = [];
        lines.slice(2).forEach(function (line) {
            if (line.indexOf('EXPORT') === 0) {
                var match = /^EXPORT ([A-Z0-9\-\_+]) as "([^"]+)"/i.exec(line);
                if (match !== null) {
                    output.push([match[1], match[2]]);
                }
            } else {
                expr.push(line);
            }
        });

        expr = (0, _expression.parse)(expr);

        return {
            label: name,
            expr: expr,
            output: output
        };
    }
};

function importSet(raw) {
    if (typeof raw !== 'string') {
        throw new Error('Expected string of import data for export');
    }

    var lines = raw.split(/\n+/);

    // Filter out comments.
    lines = lines.filter(function (line) {
        if (/^#[^\>]+/.test(line)) {
            return false;
        }
        return true;
    });

    if (lines.length < 4) {
        throw new Error('Import data is not valid');
    }

    var version = lines[0];

    if (/^v[0-9]+$/i.test(version) === false) {
        throw new Error('Import data version must be included as the first line.');
    }

    var versionFnName = 'import_' + version.toLowerCase().trim();

    if (versionImports.hasOwnProperty(versionFnName) === false) {
        throw new Error('Invalid version supplied');
    }

    var importData = versionImports[versionFnName](lines);

    return importData;
}

function exportSet(set) {
    var name = set.label.replace(/\n+/, '');
    var lines = [exportVersion, name];
    set.expr.forEach(function (item) {
        if (item.hasOwnProperty('description')) {
            item.description.forEach(function (description) {
                lines.push('#> ' + description);
            });
        }

        lines.push(item.assignment.line);

        if (item.hasOwnProperty('conditions')) {
            item.conditions.forEach(function (condition) {
                lines.push('  ' + condition.logic + ' ' + (condition.expr || condition.value));
            });
        }
    });
    set.output.forEach(function (item) {
        lines.push('EXPORT ' + item[0] + ' as "' + item[1] + '"');
    });
    return lines.join('\n');
}

exports.importSet = importSet;
exports.exportSet = exportSet;