'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.run = exports.parse = undefined;

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _ExpressionError = require('./ExpressionError');

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conditionExpr = /^\s+(AND|OR|ELSE)\s+(.*)$/i;
var assignmentExpr = /^([a-z]+[a-z0-9\-\_]*)\=([^\=]+)$/i;
var descriptionExpr = /^#\>\s*(.*)/;

var cache = {};

function _stripType(item) {
    if (item) {
        delete item.type;
    }

    return item;
}

/**
 * Parses a line and categorises the data it finds.
 *
 * @param {String} line The line to parse.
 *
 * @return mixed Will return null if no matching data is found.
 */
function _parseLine(line) {
    var match = void 0;
    var expr = void 0;
    var type = void 0;
    var result = null;

    if (assignmentExpr.test(line) === true) {
        var assignment = line.match(assignmentExpr);
        var symbol = assignment[1].trim();
        type = 'assignment';
        expr = assignment[2];

        result = {
            type: type,
            line: line,
            symbol: symbol,
            expr: expr
        };
    } else if (conditionExpr.test(line) === true) {
        match = line.match(conditionExpr);
        var logic = match[1].toUpperCase();
        var rhand = match.pop().trim();
        type = 'condition';

        result = {
            type: type,
            line: line,
            logic: logic
        };

        if (logic !== 'ELSE') {
            expr = rhand;
            result.expr = expr;
        } else {
            result.value = rhand;
        }
    } else if (descriptionExpr.test(line) === true) {
        match = line.match(descriptionExpr);
        type = 'description';

        result = {
            type: type,
            text: match[1]
        };
    } //end if

    // Pre-compile the expressions.
    if (expr && cache.hasOwnProperty(expr) === false) {
        cache[expr] = _mathjs2.default.compile(expr);
    }

    return result;
} //end _parseLine()

/**
 * Parse a raw string into formatted expression object.
 *
 * @param {String|Array} raw Raw imported expression string to parse, or array of lines.
 *
 * @return {Object}
 */
function parse(raw) {
    var lines = [];

    if (Array.isArray(raw) === true) {
        lines = raw;
    } else {
        lines = raw.split(/\n+/);
    }

    var currentAssignment = null;
    var assignments = {};
    var conditions = {};
    var descriptions = {};
    var description = null;

    lines.map(_parseLine).filter(function (parsed) {
        return parsed !== null;
    }).forEach(function (parsed, index) {
        // Handle assigments.
        if (parsed.type === 'assignment') {
            currentAssignment = 'a' + index;
            assignments[currentAssignment] = parsed;

            if (description !== null) {
                descriptions[currentAssignment] = description;
                description = null;
            }
        }

        // Handle descriptions.
        if (parsed.type === 'description') {
            if (description === null) {
                description = [parsed];
            } else {
                description.push(parsed);
            }
        }

        // Handle conditions.
        if (parsed.type === 'condition') {
            if (currentAssignment === null) {
                throw new _ExpressionError.ExpressionError('[Parser] cannot assign conditions without an assignment.');
            }

            if (conditions.hasOwnProperty(currentAssignment) === false) {
                conditions[currentAssignment] = [];
            }

            conditions[currentAssignment].push(parsed);
        }
    });

    var result = [];

    for (var id in assignments) {
        if (assignments.hasOwnProperty(id) === true) {
            result.push({
                assignment: _stripType(assignments[id]),
                conditions: (conditions[id] && conditions[id].length ? conditions[id].map(_stripType) : undefined) || [],
                description: (descriptions[id] && descriptions[id].length ? descriptions[id].map(function (item) {
                    return item.text;
                }) : undefined) || []
            });
        }
    }

    return result;
} //end parse()


function _runCachedExpr(scope, expr) {
    // Add to cache on demand if we need to.
    if (cache.hasOwnProperty(expr) !== true) {
        cache[expr] = _mathjs2.default.compile(expr);
    }

    return cache[expr].eval(scope);
} //end _runCachedExpr()

function run(data, expr) {
    var scope = (0, _object2.default)({}, data);

    expr.forEach(function (item) {
        // TODO: OR conditions.
        var pass = item.conditions.filter(function (condition) {
            return _runCachedExpr(scope, condition.expr);
        }).length === item.conditions.length;

        if (pass === true) {
            scope[item.assignment.symbol] = _runCachedExpr(scope, item.assignment.expr);;
        } else {
            var value = 0;

            // Conditions can have ELSE values if the conditions do not pass then this
            // alternate value will be used.
            item.conditions.forEach(function (condition) {
                if (condition.logic === 'ELSE') {
                    value = condition.value;
                }
            });
            scope[item.assignment.symbol] = parseFloat(value);
        }
    });

    return scope;
} //end run()

exports.parse = parse;
exports.run = run;