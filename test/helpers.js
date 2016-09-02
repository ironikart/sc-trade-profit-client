import React from 'react';
import TestUtils from 'react-addons-test-utils';

export function renderComponent(component, props) {
    let renderer = TestUtils.createRenderer();
    renderer.render(React.createElement(component, props));
    let output = renderer.getRenderOutput();

    return {
        output,
        renderer
    };
}
