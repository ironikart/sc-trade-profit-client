"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Local storage.

function get(key) {
    var state = null;
    if (window && window.localStorage) {
        state = window.localStorage.getItem(key);
    }
    return state;
}

function getJSON(key) {
    var state = get(key);
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

exports.clear = clear;
exports.storeJSON = storeJSON;
exports.getJSON = getJSON;
exports.store = store;
exports.get = get;