'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function ({ entry, outputPath, outputFilename, componentName }) {
    return {
        mode: 'production',
        entry,
        output: {
            path: path.resolve(__dirname, outputPath),
            filename: outputFilename,
            publicPath: '',
            libraryTarget: 'umd'
        },
        module: {
            rules: [
                {
                    test: /.*\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: path.resolve(__dirname, outputPath, componentName + '.html')
            })
        ],
        devServer: {
            stats: 'errors-only'
        }
    };
};
