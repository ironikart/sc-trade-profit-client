import assign from 'object.assign';
import store from '../store';
import { run } from '../util/expression';
import * as graph from '../util/graph';
import * as c from '../constants';

// Cache a jump point graph.
let pointGraph = graph.createGraphFromEdgeNodes(c.pointsGraph);

function calculateResults(state) {
    let clone = assign({}, state);
    let globalState = store.getState();
    let currentExpr = globalState.expressionReducer.sets[globalState.expressionReducer.currentIndex].expr;

    clone.result = run(clone.scope, currentExpr);

    return clone;
}

function calculateCargoSubTotal(manifestState) {
    let total = {
        totalBuy:      0,
        totalSell:     0,
        totalMass:     0,
        totalQuantity: 0
    };

    manifestState.cargo.forEach((item) => {
        let quantity = 0;
        if (Number.isNaN(item.quantity) === false && item.quantity !== '') {
            quantity = parseInt(item.quantity, 10);
        }

        if (Number.isNaN(item.buy) === false && item.buy !== '') {
            total.totalBuy += quantity * parseInt(item.buy, 10);
        }

        if (Number.isNaN(item.sell) === false && item.sell !== '') {
            total.totalSell += quantity * parseInt(item.sell, 10);
        }

        if (Number.isNaN(item.mass) === false && item.mass !== '') {
            total.totalMass += quantity * parseFloat(item.mass);
        }

        total.totalQuantity += quantity;
    });

    for (var prop in total) {
        if (total.hasOwnProperty(prop)) {
            manifestState.scope[prop] = total[prop];
        }
    }

    return manifestState;
}

function addCargo(state, action) {
    let clone = assign({}, state);
    let props = assign({}, action);
    delete props.type;
    clone.cargo.push(props);
    return calculateResults(calculateCargoSubTotal(clone));
}

function removeCargo(state, action) {
    let clone = assign({}, state);
    clone.cargo.splice(action.index, 1);
    return calculateResults(calculateCargoSubTotal(clone));
}

function updateCargo(state, action) {
    let clone = assign({}, state);
    clone.cargo[action.index][action.prop] = action.value;
    return calculateResults(calculateCargoSubTotal(clone));
}

function setShip(state, action) {
    let clone = assign({}, state);
    clone.currentShipId = action.id;

    let currentShip = c.matrix.filter((ship) => {
        return ship.id === action.id;
    });

    if (currentShip.length) {
        clone.scope.shipMass = currentShip[0].mass;
        clone.scope.shipMaxCrew = currentShip[0].maxcrew;
        clone.scope.shipCargoCapacity = currentShip[0].cargocapacity;
    }

    return calculateResults(clone);
}

// Calculate a path to the chosen jump point using an undirected cyclic graph.
function calculateSystemPath(clone) {
    if (clone.origin !== '' && clone.destination !== '') {
        let shortest = graph.shortestPath(pointGraph, clone.origin, clone.destination);
        if (shortest !== null) {
            clone.path = shortest.path || [];
            clone.scope.jumps = shortest.cost;
        }
    }

    return clone;
}

function setDestination(state, action) {
    let clone = assign({}, state);
    clone.destination = action.system;
    return calculateSystemPath(calculateResults(clone));
}

function setOrigin(state, action) {
    let clone = assign({}, state);
    clone.origin = action.system;
    return calculateSystemPath(calculateResults(clone));
}

function updateScopeValue(state, action) {
    let clone = assign({}, state);
    clone.scope[action.name] = action.value;
    return calculateResults(clone);
}

function calculateCrewCut(clone) {
    let totalCut = 0;

    clone.crew.forEach((crew) => {
        let cut = parseFloat(crew.cut);
        if (Number.isNaN(cut) === false) {
            totalCut -= cut;
        }
    });

    clone.scope.crewCut = totalCut;
    return clone;
}

function addCrew(state) {
    let clone = assign({}, state);
    clone.crew.push({
        name: 'Crew Member #'+(clone.crew.length+1),
        cut:  0
    });

    return calculateCrewCut(calculateResults(clone));
}

function removeCrew(state, action) {
    let clone = assign({}, state);
    clone.crew.splice(action.index, 1);
    return calculateCrewCut(calculateResults(clone));
}

function updateCrew(state, action) {
    let clone = assign({}, state);
    clone.crew[action.index][action.prop] = action.value;
    return calculateCrewCut(calculateResults(clone));
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
    case 'SET_SCOPE_VALUE':
        return updateScopeValue(state, action);
    case 'CALCULATE':
        return calculateResults(state);
    case 'CREW_ADD':
        return addCrew(state);
    case 'CREW_REMOVE':
        return removeCrew(state, action);
    case 'CREW_UPDATE':
        return updateCrew(state, action);
    default:
        return state;
    }
};