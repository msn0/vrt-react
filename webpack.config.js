'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist', 'badge.component.html')
        })
    ]
};
