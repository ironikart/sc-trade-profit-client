import mathjs from 'mathjs';
import { ExpressionError } from './ExpressionError';
import assign from 'object.assign';

const conditionExpr = /^\s+(AND|OR)\s+(.*)$/i;
const assignmentExpr = /^([a-z]+[a-z0-9\-\_]*)\=([^\=]+)$/i;

function _parseLine(line) {
    if (assignmentExpr.test(line) === true) {
        var assignment = line.match(assignmentExpr);
        return {
            assignment: {
                raw:  line,
                name: assignment[1].trim(),
                expr: mathjs.compile(assignment[2])
            }
        };
    } else if (conditionExpr.test(line) === true) {
        var match = line.match(conditionExpr);
        var logic = match[1].toUpperCase();
        var condition = match.pop().trim();
        return {
            condition: {
                raw:  line,
                type: logic,
                expr: mathjs.compile(condition)
            }
        };
    }

    return null;
}

function _parse(raw) {
    var lines = [];

    if (Array.isArray(raw) === true) {
        lines = raw;
    }

    if (typeof raw === 'string') {
        lines = raw.split(/\n+/);
    }

    var currentAssignment = null;
    var assignments = {};
    var conditions = {};

    lines
    .map(_parseLine)
    .filter((parsed) => {
        return parsed !== null;
    })
    .forEach((parsed, index) => {
        if (parsed.hasOwnProperty('assignment') === true) {
            currentAssignment = 'a'+index;
            assignments[currentAssignment] = parsed.assignment;
        }

        if (parsed.hasOwnProperty('condition') === true) {
            if (currentAssignment === null) {
                throw new ExpressionError(
                    '[Parser] cannot assign conditions without an assignment.'
                );
            }

            if (conditions.hasOwnProperty(currentAssignment) === false) {
                conditions[currentAssignment] = [];
            }

            conditions[currentAssignment].push(parsed.condition);
        }
    });

    return {
        assignments,
        conditions
    };
}

class Expression {
    constructor(raw) {
        this._parsed = _parse(raw);
    }

    run(data) {
        let scope = assign({}, data);
        for (var id in this._parsed.assignments) {
            if (this._parsed.assignments.hasOwnProperty(id)) {
                var pass = true;
                if (this._parsed.conditions.hasOwnProperty(id) === true) {
                    //TODO: logic for AND/OR
                    pass = this._parsed.conditions[id].filter(function(condition) {
                        return condition.expr.eval(scope);
                    }).length === this._parsed.conditions[id].length;
                }

                if (pass === true) {
                    scope[this._parsed.assignments[id].name] = this._parsed.assignments[id].expr.eval(scope);
                } else {
                    // TODO: check this logic - we want the variable in the scope to perform conditional
                    // calculations but perhaps some expressions will fail.
                    // Default the variable value to 0.
                    scope[this._parsed.assignments[id].name] = 0;
                }
            }
        }

        return scope;
    }
}

export default Expression;