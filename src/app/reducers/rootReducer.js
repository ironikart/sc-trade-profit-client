import { combineReducers } from 'redux';
import expressionReducer from './expressionReducer.js';
import manifestReducer from './manifestReducer.js';

const rootReducer = combineReducers({
    expressionReducer,
    manifestReducer,
});

export default rootReducer;