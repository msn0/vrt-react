'use strict';

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './entry',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'badge.component.js',
        publicPath: '',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /.*\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
