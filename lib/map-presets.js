'use strict';

const path = require('path');
const slugify = require('slugify');
const getWebpackConfig = require('./webpack.config');
const fs = require('fs');

module.exports = function mapPresets({
    testTemplate,
    entryTemplate,
    componentName,
    vrtDir,
    vrtGlobalConfig,
    vrtTestsDir,
    port,
    componentDir,
    ci,
    configFile,
    componentFile
}) {
    return function ({ name, namedImport }, presetIndex) {
        const componentNameWithId = `${componentName}_${slugify(name)}`;
        const entryFile = path.resolve(vrtDir, `${componentNameWithId}.entry.js`);
        const testFile = path.resolve(vrtTestsDir, `${componentNameWithId}.test.js`);

        const testFileContent = testTemplate({
            port,
            file: `${componentNameWithId}.html`,
            screensDir: path.resolve(componentDir, '__screenshots__'),
            describe: path.parse(path.parse(path.resolve(componentDir, '__screenshots__')).dir).base + '/__screenshots__',
            snapshotName: slugify(name),
            ci
        });
        const entryFileContent = entryTemplate({
            configFile,
            componentFile,
            presetIndex,
            namedImport
        });

        fs.writeFileSync(testFile, testFileContent);
        fs.writeFileSync(entryFile, entryFileContent);

        webpackConfig.push(getWebpackConfig({
            componentNameWithId,
            entry: entryFile,
            outputPath: vrtDir,
            outputFilename: `${componentNameWithId}.bundle.js`,
            loaders: vrtGlobalConfig.webpack && vrtGlobalConfig.webpack.loaders || [],
            resolve: vrtGlobalConfig.webpack && vrtGlobalConfig.webpack.resolve || undefined
        }));
        testFiles.push(testFile);
    };
};
