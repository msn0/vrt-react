'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function ({ isDevMode, entry, outputPath, outputFilename, componentNameWithId, loaders = [], resolve }) {
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
        mode: isDevMode ? 'development' : 'production',
        entry,
        output: {
            path: path.resolve(__dirname, outputPath),
            filename: outputFilename,
            publicPath: '',
            libraryTarget: 'umd'
        },
        module: { rules },
        plugins: [
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
