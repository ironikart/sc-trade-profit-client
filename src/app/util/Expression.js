import mathjs from 'mathjs';
import { ExpressionError } from './ExpressionError';
import assign from 'object.assign';

const conditionExpr = /^\s+(AND|OR)\s+(.*)$/i;
const assignmentExpr = /^([a-z]+[a-z0-9\-\_]*)\=([^\=]+)$/i;
const descriptionExpr = /^#\>\s*(.*)/;

/**
 * Parses a line and categorises the data it finds.
 *
 * @param {String} line The line to parse.
 *
 * @return mixed Will return null if no matching data is found.
 */
function _parseLine(line) {
    let match;
    if (assignmentExpr.test(line) === true) {
        let assignment = line.match(assignmentExpr);
        return {
            assignment: {
                raw:  line,
                name: assignment[1].trim(),
                expr: mathjs.compile(assignment[2])
            }
        };
    } else if (conditionExpr.test(line) === true) {
        match = line.match(conditionExpr);
        let logic = match[1].toUpperCase();
        let condition = match.pop().trim();
        return {
            condition: {
                raw:  line,
                type: logic,
                expr: mathjs.compile(condition)
            }
        };
    } else if (descriptionExpr.test(line) === true) {
        match = line.match(descriptionExpr);
        return {
            description: match[1]
        };
    }//end if

    return null;

}//end _parseLine()

/**
 * Parse a raw string into formatted expression object.
 *
 * @param {String} raw Raw imported expression string to parse.
 *
 * @return {Object}
 */
function _parse(raw) {
    let lines = [];

    if (Array.isArray(raw) === true) {
        lines = raw;
    }

    if (typeof raw === 'string') {
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
        if (parsed.hasOwnProperty('assignment') === true) {
            currentAssignment = 'a'+index;
            assignments[currentAssignment] = parsed.assignment;

            if (description !== null) {
                descriptions[currentAssignment] = description;
                description = null;
            }
        }

        // Handle descriptions.
        if (parsed.hasOwnProperty('description') === true) {
            if (description === null) {
                description = [parsed.description];
            } else {
                description.push(parsed.description);
            }
        }

        // Handle conditions.
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
        conditions,
        descriptions
    };
}

class Expression {

    /**
     * Constructor
     *
     * @param {String} raw Initial string to parse.
     *
     * @return void
     */
    constructor(raw) {
        if (raw) {
            this.parse(raw);
        }

    }//end constructor()

    /**
     * Parse a raw string into an expression.
     *
     * @param {String} raw Initial string to parse.
     *
     * @return void
     */
    parse(raw) {
        this._parsed = _parse(raw);

    }//end parse()


    /**
     * Run the expression against scope data.
     *
     * @param {Object} data Initial data hash.
     *
     * @return {Object} modified data hash with new assignments.
     */
    run(data) {
        if (!this._parsed) {
            return;
        }

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

    }//end run()

    /**
     * Convert this object into JSON.
     *
     * @return {Object}
     */
    toJSON() {
        let readable = [];

        for (var id in this._parsed.assignments) {
            if (this._parsed.assignments.hasOwnProperty(id) === true) {
                readable.push({
                    assignment:  this._parsed.assignments[id],
                    conditions:  this._parsed.conditions[id] || [],
                    description: this._parsed.descriptions[id] || []
                });
            }
        }

        return readable;

    }//end toJSON()

}//end class

export default Expression;
