'use strict';

const path = require('path');
const slugify = require('slugify');
const ejs = require('ejs');
const fs = require('fs');

module.exports.testTemplateCompiler = function () {
    const testTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'template.ejs'), 'UTF-8'));

    return function (options) {
        const { port, componentNameWithId, componentDir, name } = options;
        const screensDir = path.relative(path.resolve(), path.join(componentDir, '__screenshots__'));
        const pageUrl = `http://localhost:${port}/${componentNameWithId}.html`;
        const content = testTemplate({
            pageUrl,
            screensDir,
            snapshotName: slugify(name)
        });

        return {
            content,
            pageUrl
        };
    };
};
