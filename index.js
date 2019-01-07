#!/usr/bin/env node

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const getWebpackConfig = require('./webpack.config');
const jest = require('jest');
const glob = require('glob');
const getPort = require('get-port');
const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');
const nanoid = require('nanoid');

const testTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, './test-template.js'), 'UTF-8'));
const entryTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, './entry-template.js'), 'UTF-8'));
const vrtDir = path.resolve('.vrt');
const vrtTestsDir = path.resolve(vrtDir, '__tests__');
const vrtGlobalConfig = require(path.resolve('./vrt.config'));

if (!fs.existsSync(vrtDir)) {
    fs.mkdirSync(vrtDir);
}

if (!fs.existsSync(vrtTestsDir)) {
    fs.mkdirSync(vrtTestsDir);
}

glob(path.resolve('./**/.vrt.js'), { absolute: true }, (error, files) => {
    files.forEach(async (configFile) => {
        const config = require(configFile);
        const componentDir = path.dirname(configFile);
        const componentFile = path.resolve(componentDir, config.main);
        const componentName = path.basename(componentFile, '.js');
        const id = nanoid(5);
        const entryFile = path.resolve(vrtDir, `${componentName}_${id}.entry.js`);
        const testFile = path.resolve(vrtTestsDir, `${componentName}_${id}.test.js`);
        const port = await getPort();
        const testFileContent = testTemplate({
            port,
            file: componentName + '.html',
            screensDir: path.resolve(componentDir, '__screenshots__'),
            describe: path.parse(path.parse(path.resolve(componentDir, '__screenshots__')).dir).base + '/__screenshots__',
            snapshotName: componentName
        });
        const entryFileContent = entryTemplate({ componentFile });

        fs.writeFileSync(testFile, testFileContent);
        fs.writeFileSync(entryFile, entryFileContent);

        const webpackConfig = getWebpackConfig({
            componentName,
            entry: entryFile,
            outputPath: vrtDir,
            outputFilename: componentName + '.bundle.js',
            loaders: vrtGlobalConfig.webpack && vrtGlobalConfig.webpack.loaders || []
        });

        const server = new WebpackDevServer(Webpack(webpackConfig), { stats: 'errors-only' });

        server.listen(port, 'localhost', async () => {
            await jest.run([
                '--silent',
                '--verbose',
                '--updateSnapshot',
                '--detectOpenHandles',
                '--runTestsByPath', testFile
            ]);

            server.close();
        });
    });
});
