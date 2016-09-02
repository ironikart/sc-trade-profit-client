// Local storage.

function get(key) {
    let state = null;
    if (window && window.localStorage) {
        state = window.localStorage.getItem(key);
    }
    return state;
}

function getJSON(key) {
    let state = get(key);
    if (state !== null) {
        return JSON.parse(state);
    }
    return null;
}

function store(key, state) {
    if (window && window.localStorage) {
        window.localStorage.setItem(key, state);
    }
}

function storeJSON(key, state) {
    store(key, JSON.stringify(state));
}

function clear(key) {
    if (window && window.localStorage) {
        window.localStorage.removeItem(key);
    }
}

export { clear, storeJSON, getJSON, store, get };