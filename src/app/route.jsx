import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import assign from 'object.assign';
import * as expressionActions from './actions/expressionActions.js';
import * as manifestActions from './actions/manifestActions.js';

import ExpressionEditor from './components/ExpressionEditor.jsx';

let routes = {
    ExpressionEditor
};

function mapStateToProps(state) {
    return {
        'expressions': state.expressionReducer,
        'manifest':    state.manifestReducer
    };
}

function mapDispatchToProps(dispatch) {
    let creators = assign({}, expressionActions, manifestActions);
    return bindActionCreators(creators, dispatch);
}

export default function(routeName) {
    let Route = routes[routeName];

    if (!Route) {
        console.log(routeName);
        throw new Error('Unable to determine route');
    }

    // Pass parts of the store state to connected components
    let RouteHandler = connect(mapStateToProps, mapDispatchToProps)(Route);

    return { Route, RouteHandler };
}
