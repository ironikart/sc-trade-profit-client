import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import route from './route.jsx';
import store from './store';

let anchorRoute = 'ExpressionEditor';
let mainElem = document.getElementById('appBody');

function onHashChange(href) {
    if (href.indexOf('#') !== -1) {
        let anchor = href.split('#').pop();
        if (/^\s*$/.test(anchor) === false) {
            anchorRoute = anchor;
        }
    }

    let { RouteHandler } = route(anchorRoute);

    render(
        <Provider store={store}>
            <RouteHandler />
        </Provider>,
        mainElem
    );
}

window.addEventListener('hashchange', function() {
    onHashChange(window.location.href);
}, false);

onHashChange(window.location.href);
