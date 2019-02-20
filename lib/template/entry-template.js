'use strict';

const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

module.exports.entryTemplateCompiler = function () {
    const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'entry-template.ejs'), 'UTF-8'));

    return function (options) {
        const { configFile, componentDir, presetIndex, namedImport, vrtDir } = options;
        const config = require(configFile);

        return template({
            configFile: './' + path.relative(vrtDir, configFile),
            componentFile: './' + path.relative(vrtDir, path.resolve(componentDir, config.main)),
            presetIndex,
            namedImport
        });
    };
};
