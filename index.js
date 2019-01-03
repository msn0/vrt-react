'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const webpackConfig = require('./webpack.config');
const jest = require('jest');
const glob = require('glob');
const getPort = require('get-port');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

glob('**/vrt.json', { absolute: true }, (error, files) => {
    files.forEach(async (configFile) => {
        // const compiler = Webpack(webpackConfig);
        // const devServerOptions = Object.assign({}, webpackConfig.devServer);
        // const server = new WebpackDevServer(compiler, devServerOptions);
        const config = require(configFile);
        const componentDir = path.dirname(configFile);
        const vrtDir = path.resolve(componentDir, '.vrt');
        const componentFile = path.resolve(componentDir, config.main);
        const componentName = path.basename(componentFile, '.js');
        const testFilePath = path.resolve(vrtDir, componentName + '.test.js');

        if (!fs.existsSync(vrtDir)) {
            fs.mkdirSync(vrtDir);
        }

        const port = await getPort();
        const testTemplate = ejs.compile(fs.readFileSync('./test-template.js', 'UTF-8'));
        const testFileContent = testTemplate({
            port,
            file: componentName + '.html'
        });

        fs.writeFileSync(testFilePath, testFileContent);

        // console.log(configFilePath, port, componentDir, require(configFilePath));

        // console.log(template({ port, file }));

        // server.listen(port, '127.0.0.1', () => {
        //     jest
        //         .run(['--detectOpenHandles', `--port ${port}`, '\.vrt\/.+\.test\.js'])
        //         .then(() => server.close());
        // });
    });
});
