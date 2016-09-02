import assign from 'object.assign';

// TODO: remove duplicated code.

function addSet(state, action) {
    let clone = assign({}, state);
    clone.sets.push({
        label:  action.setName,
        output: 'total',
        expr:   ['total=sell - buy']
    });
    clone.currentIndex = clone.sets.length - 1;
    return clone;
}

function removeSet(state, action) {
    // Don't remove the last set.
    if (state.sets.length === 1) {
        return state;
    }

    if (state.sets[action.setIndex] !== undefined) {
        let clone = assign({}, state);
        clone.sets.splice(action.setIndex, 1);

        // If we are viewing the deleted index then change the current index
        // to the first one in the list.
        if (clone.currentIndex === action.setIndex) {
            clone.currentIndex = 0;
        }

        return clone;
    } else {
        return state;
    }
}

function addExpression(state, action) {
    let clone = assign({}, state);
    let expr = action.expr || '';
    clone.sets[action.setIndex].expr.splice(action.exprIndex, 0, expr);
    return clone;
}

function setCurrentExpressionSet(state, index) {
    let clone = assign({}, state);
    clone.currentIndex = index;
    return clone;
}

function updateExpression(state, action) {
    let clone = assign({}, state);
    clone.sets[action.setIndex].expr[action.id] = action.expression;
    return clone;
}

function removeExpression(state, action) {
    let clone = assign({}, state);
    clone.sets[action.setIndex].expr.splice(action.exprIndex, 1);
    return clone;
}

function moveExpression(state, action) {
    let clone = assign({}, state);
    let oldIndex = action.exprIndex;
    let newIndex = action.exprIndex + 1;
    if (action.direction === 'up') {
        newIndex = action.exprIndex - 1;
    }

    let old = clone.sets[action.setIndex].expr[oldIndex];
    clone.sets[action.setIndex].expr[oldIndex] = clone.sets[action.setIndex].expr[newIndex];
    clone.sets[action.setIndex].expr[newIndex] = old;
    return clone;
}

function importSet(state, action) {
    let clone = addSet(state, action);
    clone.sets[clone.currentIndex].expr = action.expr;
    return clone;
}

export default function expressionReducer(state = {}, action) {
    switch (action.type) {
    case 'EXPR_SET':
        return setCurrentExpressionSet(state, action.index);
    case 'EXPR_ADD_SET':
        return addSet(state, action);
    case 'EXPR_REMOVE_SET':
        return removeSet(state, action);
    case 'EXPR_IMPORT_SET':
        return importSet(state, action);
    case 'EXPR_UPDATE':
        return updateExpression(state, action);
    case 'EXPR_ADD':
        return addExpression(state, action);
    case 'EXPR_REMOVE':
        return removeExpression(state, action);
    case 'EXPR_MOVE':
        return moveExpression(state, action);
    default:
        return state;
    }
};