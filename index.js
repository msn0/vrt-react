#!/usr/bin/env node

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const webpackConfig = require('./webpack.config');
const jest = require('jest');
const glob = require('glob');
const getPort = require('get-port');
const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

const devServerOptions = Object.assign({}, webpackConfig.devServer);
const testTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, './test-template.js'), 'UTF-8'));
const entryTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, './entry-template.js'), 'UTF-8'));

glob('./**/vrt.json', { absolute: true }, (error, files) => {
    files.forEach(async (configFile) => {
        const config = require(configFile);
        const componentDir = path.dirname(configFile);
        const vrtDir = path.resolve(componentDir, '.vrt');
        const componentFile = path.resolve(componentDir, config.main);
        const componentName = path.basename(componentFile, '.js');

        if (!fs.existsSync(vrtDir)) {
            fs.mkdirSync(vrtDir);
        }

        const port = await getPort();
        const testFileContent = testTemplate({
            port,
            file: componentName + '.html',
            screensDir: componentDir + '/__screenshots__',
            snapshotName: componentName
        });
        const entryFileContent = entryTemplate({ componentFile });

        fs.writeFileSync(path.resolve(vrtDir, componentName + '.test.js'), testFileContent);
        fs.writeFileSync(path.resolve(vrtDir, componentName + '.entry.js'), entryFileContent);

        const compiler = Webpack(webpackConfig({
            componentName,
            entry: path.resolve(vrtDir, componentName + '.entry.js'),
            outputPath: vrtDir,
            outputFilename: componentName + '.bundle.js'
        }));

        const server = new WebpackDevServer(compiler, devServerOptions);

        server.listen(port, 'localhost', () => {
            console.log('RUNNING', componentName);
            jest
                .run([
                    '-i',
                    '--detectOpenHandles',
                    '--config', path.resolve(__dirname, 'jest.config.js'),
                    componentName + '\.test\.js'
                ])
                .then(() => {
                    server.close();
                    fs.removeSync(vrtDir);
                });
        });
    });
});
