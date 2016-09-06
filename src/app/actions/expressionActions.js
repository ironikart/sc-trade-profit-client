function setCurrent(index) {
    return {
        type: 'EXPR_SET',
        index
    };
}

function addSet(setName) {
    return {
        type: 'EXPR_ADD_SET',
        setName
    };
}

function importSet(setName, expr) {
    return {
        type: 'EXPR_IMPORT_SET',
        setName,
        expr
    };
}

function removeSet(setIndex) {
    return {
        type: 'EXPR_REMOVE_SET',
        setIndex
    };
}

function addExpression(setIndex, exprIndex, expr) {
    return {
        type: 'EXPR_ADD',
        setIndex,
        exprIndex,
        expr
    };
}

function removeExpression(setIndex, exprIndex) {
    return {
        type: 'EXPR_REMOVE',
        setIndex,
        exprIndex
    };
}

function addCondition(setName, id, condition) {
    return {
        type: 'EXPR_ADD_CONDITION',
        setName,
        id,
        condition
    };
}

function updateExpression(setIndex, id, expression) {
    return {
        type: 'EXPR_UPDATE',
        setIndex,
        id,
        expression
    };
}

function moveExpression(setIndex, exprIndex, direction) {
    return {
        type: 'EXPR_MOVE',
        setIndex,
        exprIndex,
        direction
    };
}

function updateDescription(setIndex, exprIndex, description) {
    return {
        type: 'EXPR_UPDATE_DESCRIPTION',
        setIndex,
        exprIndex,
        description
    };
}

module.exports = {
    addSet,
    removeSet,
    importSet,
    setCurrent,
    addExpression,
    addCondition,
    updateExpression,
    removeExpression,
    moveExpression,
    updateDescription
};