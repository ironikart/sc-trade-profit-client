/**
 * Read the raw ship matrix data scraped from:
 * https://robertsspaceindustries.com/ship-specs
 *
 * Output a trimmed version with the stats that we care about.
 */

var path = require('path');
var matrix = require(path.resolve(__dirname, '../data/ship_matrix_raw.json'));
var dest = path.resolve(__dirname, '../data/ship_matrix_parsed.json');
var fs = require('fs');

var numericProps = ['id', 'cargocapacity', 'mass', 'maxcrew'];
var desiredProps = ['id', 'name', 'cargocapacity', 'mass', 'maxcrew'];

var output = matrix.map(function(ship) {
    var out = {};
    desiredProps.forEach(function(propName) {
        if (ship.hasOwnProperty(propName)) {
            if (numericProps.indexOf(propName) === -1) {
                out[propName] = ship[propName];
            } else {
                out[propName] = parseFloat(ship[propName]);
            }
        }
    });
    return out;
});

console.log('Writing %s ship specs to %s', output.length, dest);
fs.writeFileSync(dest, JSON.stringify(output, true, '    '));