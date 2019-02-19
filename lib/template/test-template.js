'use strict';

const path = require('path');
const slugify = require('slugify');
const ejs = require('ejs');
const fs = require('fs');

module.exports.testTemplateCompiler = function () {
    const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, './test-template.ejs'), 'UTF-8'));

    return function (options) {
        const { port, componentNameWithId, componentDir, name } = options;

        return template({
            port,
            file: `${componentNameWithId}.html`,
            screensDir: path.relative(componentDir, '__screenshots__'),
            describe: path.parse(path.parse(path.resolve(componentDir, '__screenshots__')).dir).base + '/__screenshots__',
            snapshotName: slugify(name)
        });
    };
};
