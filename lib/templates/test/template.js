'use strict';

const path = require('path');
const slugify = require('slugify');
const ejs = require('ejs');
const fs = require('fs');

module.exports.testTemplateCompiler = function () {
    const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'template.ejs'), 'UTF-8'));

    return function (options) {
        const { port, componentNameWithId, componentDir, name } = options;
        const screensDir = path.relative(path.resolve(), path.join(componentDir, '__screenshots__'));

        return template({
            screensDir,
            snapshotName: slugify(name),
            pageUrl: `http://localhost:${port}/${componentNameWithId}.html`
        });
    };
};
