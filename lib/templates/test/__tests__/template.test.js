import test from 'ava';
import { testTemplateCompiler } from '../template';
import fs from 'fs';
import path from 'path';

test('should return test file content', t => {
    const template = testTemplateCompiler();

    const { content } = template({
        port: 1234,
        componentNameWithId: 'foobar',
        componentDir: 'components/foobar',
        name: 'Simple FooBar'
    });

    t.is(content, fs.readFileSync(path.resolve(__dirname, './fixtures/template-expected.js'), 'UTF-8'));
});

test('should return test page url', t => {
    const template = testTemplateCompiler();

    const { pageUrl } = template({
        port: 1234,
        componentNameWithId: 'foobar',
        componentDir: 'components/foobar',
        name: 'Simple FooBar'
    });

    t.is(pageUrl, 'http://localhost:1234/foobar.html');
});
