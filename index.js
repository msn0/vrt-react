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
        const config = require(configFile);
        const componentDir = path.dirname(configFile);
        const vrtDir = path.resolve(componentDir, '.vrt');
        const componentFile = path.resolve(componentDir, config.main);
        const componentName = path.basename(componentFile, '.js');

        if (!fs.existsSync(vrtDir)) {
            fs.mkdirSync(vrtDir);
        }

        const port = await getPort();
        const testTemplate = ejs.compile(fs.readFileSync('./test-template.js', 'UTF-8'));
        const testFileContent = testTemplate({
            port,
            file: componentName + '.html',
            screensDir: componentDir + '/__screenshots__',
            snapshotName: componentName
        });
        const entryTemplate = ejs.compile(fs.readFileSync('./entry-template.js', 'UTF-8'));
        const entryFileContent = entryTemplate({ componentFile });

        fs.writeFileSync(path.resolve(vrtDir, componentName + '.test.js'), testFileContent);
        fs.writeFileSync(path.resolve(vrtDir, componentName + '.entry.js'), entryFileContent);

        const compiler = Webpack(webpackConfig({
            componentName,
            entry: path.resolve(vrtDir, componentName + '.entry.js'),
            outputPath: vrtDir,
            outputFilename: componentName + '.bundle.js'
        }));
        const devServerOptions = Object.assign({}, webpackConfig.devServer);
        const server = new WebpackDevServer(compiler, devServerOptions);

        server.listen(port, '127.0.0.1', () => {
            jest
                .run(['--detectOpenHandles', '\.vrt\/.+\.test\.js'])
                .then(() => server.close());
        });
    });
});
