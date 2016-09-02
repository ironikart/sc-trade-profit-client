import assign from 'object.assign';

function addCargo(state, action) {
    let clone = assign({}, state);
    let props = assign({}, action);
    delete props.type;
    clone.cargo.push(props);
    return clone;
}

function removeCargo(state, action) {
    let clone = assign({}, state);
    clone.cargo.splice(action.index, 1);
    return clone;
}

function updateCargo(state, action) {
    let clone = assign({}, state);
    clone.cargo[action.index][action.prop] = action.value;
    return clone;
}

function setShip(state, action) {
    let clone = assign({}, state);
    clone.currentShipId = action.id;
    return clone;
}

function setDestination(state, action) {
    let clone = assign({}, state);
    clone.destination = action.system;
    return clone;
}

function setOrigin(state, action) {
    let clone = assign({}, state);
    clone.origin = action.system;
    return clone;
}

export default function manifestReducer(state = {}, action) {
    switch (action.type) {
    case 'CARGO_ADD':
        return addCargo(state, action);
    case 'CARGO_REMOVE':
        return removeCargo(state, action);
    case 'CARGO_UPDATE':
        return updateCargo(state, action);
    case 'SET_SHIP':
        return setShip(state, action);
    case 'SET_DESTINATION':
        return setDestination(state, action);
    case 'SET_ORIGIN':
        return setOrigin(state, action);
    default:
        return state;
    }
};