import { createStore } from 'redux';
import reducer from './reducers/rootReducer.js';
import { getJSON } from './util/local_store';
import { parse } from './util/expression';
import assign from 'object.assign';

// Freelancer as default ship (id 16).
let defaultShip = 16;

let simpleExpression = parse([
    '#> Simple expression of total profit to buy cargo vs selling it.',
    'total=(totalSell - totalBuy) + crewCut'
]);

let advancedExpression = parse([
    'base_profit=totalSell - totalBuy',
    '#> Expression of minutes per jump',
    'time_per_jump=5',
    '#> How many items can be loaded per minute.',
    'load_time_per_item=0.10',
    '#> How many items can be un-loaded per minute.',
    'unload_time_per_item=0.10',
    'time=(jumps * time_per_jump) + (load_time_per_item * totalQuantity) + (unload_time_per_item * totalQuantity)',
    '#> Determines how \'valuable\' your time is. In this case it is 20 UEC per minute',
    'time_value=time * 20',
    'total=(base_profit - time_value) + crewCut'
]);

let initialState = {
    'manifestReducer': {
        'currentShipId': defaultShip,
        'cargo':         [],
        'destination':   '',
        'origin':        '',
        'path':          [],
        'crew':          [],
        'scope':         {
            'crewCut':           0,
            'jumps':             0,
            'shipCargoCapacity': 0,
            'totalBuy':          0,
            'totalSell':         0,
            'shipMass':          0,
            'cargoMass':         0,
            'shipMaxCrew':       0,
            'totalQuantity':     0
        },
        'result': null
    },
    'expressionReducer': {
        'currentIndex': 0,
        'sets': [
            {
                'label':  'Profit (simple)',
                'output': [
                    ['total', 'Total Profit']
                ],
                'expr': simpleExpression
            },
            {
                'label':  'Profit (advanced)',
                'output': [
                    ['crewCut', 'Crew Cut'],
                    ['base_profit', 'Base Profit'],
                    ['total', 'Total Profit'],
                ],
                'expr': advancedExpression
            }
        ]
    }
};

let expression = getJSON('expressions');
if (expression !== null) {
    initialState.expressionReducer = expression;
}

let manifest = getJSON('manifest');
if (manifest !== null) {
    initialState.manifestReducer = assign(initialState.manifestReducer, manifest);
}

let store = createStore(reducer, initialState);

export default store;