import React from 'react';
import { render } from 'react-dom';
import { presets } from '<%= configFile %>';
import Component from '<%= componentFile %>';

if (presets && presets.length > 0) {
    const { props } = presets[<%= presetIndex %>];
    render(<Component { ...props }/>, document.body);
} else {
    render(<Component />, document.body);
}

