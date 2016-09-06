import mathjs from 'mathjs';
import { ExpressionError } from './ExpressionError';
import assign from 'object.assign';

const conditionExpr = /^\s+(AND|OR|ELSE)\s+(.*)$/i;
const assignmentExpr = /^([a-z]+[a-z0-9\-\_]*)\=([^\=]+)$/i;
const descriptionExpr = /^#\>\s*(.*)/;

let cache = {};

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
    let match;
    let expr;
    let type;
    let result = null;

    if (assignmentExpr.test(line) === true) {
        let assignment = line.match(assignmentExpr);
        let symbol = assignment[1].trim();
        type = 'assignment';
        expr = assignment[2];

        result = {
            type,
            line,
            symbol,
            expr
        };
    } else if (conditionExpr.test(line) === true) {
        match = line.match(conditionExpr);
        let logic = match[1].toUpperCase();
        let rhand = match.pop().trim();
        type = 'condition';

        result = {
            type,
            line,
            logic
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
            type,
            text: match[1]
        };
    }//end if

    // Pre-compile the expressions.
    if (expr && cache.hasOwnProperty(expr) === false) {
        cache[expr] = mathjs.compile(expr);
    }

    return result;

}//end _parseLine()

/**
 * Parse a raw string into formatted expression object.
 *
 * @param {String|Array} raw Raw imported expression string to parse, or array of lines.
 *
 * @return {Object}
 */
function parse(raw) {
    let lines = [];

    if (Array.isArray(raw) === true) {
        lines = raw;
    } else {
        lines = raw.split(/\n+/);
    }

    let currentAssignment = null;
    let assignments = {};
    let conditions = {};
    let descriptions = {};
    let description = null;

    lines
    .map(_parseLine)
    .filter((parsed) => {
        return parsed !== null;
    })
    .forEach((parsed, index) => {
        // Handle assigments.
        if (parsed.type === 'assignment') {
            currentAssignment = 'a'+index;
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
                throw new ExpressionError(
                    '[Parser] cannot assign conditions without an assignment.'
                );
            }

            if (conditions.hasOwnProperty(currentAssignment) === false) {
                conditions[currentAssignment] = [];
            }

            conditions[currentAssignment].push(parsed);
        }
    });

    let result = [];

    for (var id in assignments) {
        if (assignments.hasOwnProperty(id) === true) {
            result.push({
                assignment: _stripType(assignments[id]),
                conditions: (conditions[id] && conditions[id].length ?
                    conditions[id].map(_stripType) : undefined) || [],
                description: (descriptions[id] && descriptions[id].length ?
                    descriptions[id].map(function(item) { return item.text; }) : undefined) || []
            });
        }
    }

    return result;
}//end parse()


function _runCachedExpr(scope, expr) {
     // Add to cache on demand if we need to.
    if (cache.hasOwnProperty(expr) !== true) {
        cache[expr] = mathjs.compile(expr);
    }

    return cache[expr].eval(scope);

}//end _runCachedExpr()

function run(data, expr) {
    let scope = assign({}, data);

    expr.forEach((item) => {
        // TODO: OR conditions.
        let pass = item.conditions.filter(function(condition) {
            return _runCachedExpr(scope, condition.expr);
        }).length === item.conditions.length;

        if (pass === true) {
            scope[item.assignment.symbol] = _runCachedExpr(scope, item.assignment.expr);;
        } else {
            let value = 0;

            // Conditions can have ELSE values if the conditions do not pass then this
            // alternate value will be used.
            item.conditions.forEach(function(condition) {
                if (condition.logic === 'ELSE') {
                    value = condition.value;
                }
            });
            scope[item.assignment.symbol] = parseFloat(value);
        }
    });

    return scope;
}//end run()

export {
    parse,
    run
};
