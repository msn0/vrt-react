import React from 'react';
import { render } from 'react-dom';
import { presets } from './../lib/template/__tests__/fixtures/entry-template-config.js';

import Component from './../components/foobar/foobar-component';

if (presets && presets.length > 0) {
    const { props } = presets[6];
    render(<Component { ...props }/>, document.body);
} else {
    render(<Component />, document.body);
}
