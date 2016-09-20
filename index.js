var set = require('./libs/set');
var expression = require('./libs/expression');

// Map available methods.
module.exports = {
    import: set.importSet,
    export: set.exportSet,
    parse:  expression.parse,
    run:    expression.run
};