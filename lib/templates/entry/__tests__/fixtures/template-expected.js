import React from 'react';
import { render } from 'react-dom';
import { presets } from './../lib/templates/entry/__tests__/fixtures/template-config.js';

import Component from './../components/foobar/foobar-component';

if (presets && presets.length > 0) {
    const { props } = presets[6];
    render(<Component { ...props }/>, document.body);
} else {
    render(<Component />, document.body);
}
