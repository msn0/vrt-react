'use strict';

const path = require('path');
const slugify = require('slugify');

module.exports.getTestFileContent = function (template, options) {
    const { port, componentNameWithId, componentDir, name } = options;

    return template({
        port,
        file: `${componentNameWithId}.html`,
        screensDir: path.resolve(componentDir, '__screenshots__'),
        describe: path.parse(path.parse(path.resolve(componentDir, '__screenshots__')).dir).base + '/__screenshots__',
        snapshotName: slugify(name)
    });
};
