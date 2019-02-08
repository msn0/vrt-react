'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hmrPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = function ({ entry, outputPath, outputFilename, componentNameWithId, loaders = [], resolve }) {
    const rules = [
        {
            test: /.*\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react'
                ]
            }
        }
    ].concat(loaders);

    const config = {
        mode: 'development',
        entry,
        output: {
            path: path.resolve(__dirname, outputPath),
            filename: outputFilename,
            publicPath: '',
            libraryTarget: 'umd'
        },
        module: { rules },
        plugins: [
            hmrPlugin,
            new HtmlWebpackPlugin({
                filename: path.resolve(__dirname, outputPath, `${componentNameWithId}.html`),
                meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
            })
        ]
    };

    if (resolve) {
        config.resolve = resolve;
    }

    return config;
};
