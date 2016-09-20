function addCargo(name, buy, sell, quantity, mass) {
    return {
        type: 'CARGO_ADD',
        name,
        buy,
        sell,
        quantity,
        mass
    };
}

function removeCargo(index) {
    return {
        type: 'CARGO_REMOVE',
        index
    };
}

function updateCargo(index, prop, value) {
    return {
        type: 'CARGO_UPDATE',
        index,
        prop,
        value
    };
}

function setDestination(system) {
    return {
        type: 'SET_DESTINATION',
        system
    };
}

function setOrigin(system) {
    return {
        type: 'SET_ORIGIN',
        system
    };
}

function setCurrentShip(id) {
    return {
        type: 'SET_SHIP',
        id
    };
}

function updateScopeValue(name, value) {
    return {
        type: 'SET_SCOPE_VALUE',
        name,
        value
    };
}

function calculate() {
    return {
        type: 'CALCULATE'
    };
}

function addCrew() {
    return {
        type: 'CREW_ADD'
    };
}

function removeCrew(index) {
    return {
        type: 'CREW_REMOVE',
        index
    };
}

function updateCrew(index, prop, value) {
    return {
        type: 'CREW_UPDATE',
        index,
        prop,
        value
    };
}

function updateCrewType(index, cutType) {
    return {
        type: 'CREW_TYPE',
        index,
        cutType
    };
}

module.exports = {
    addCargo,
    updateCargo,
    removeCargo,
    setCurrentShip,
    setDestination,
    setOrigin,
    updateScopeValue,
    calculate,
    addCrew,
    removeCrew,
    updateCrew,
    updateCrewType
};