import test from 'ava';
import { testTemplateCompiler } from '../test-template';
import fs from 'fs';
import path from 'path';

test('should get test file content', t => {
    const template = testTemplateCompiler();

    const content = template({
        port: 1234,
        componentNameWithId: 'foobar',
        componentDir: 'components/foobar',
        name: 'Simple FooBar'
    });

    t.is(content, fs.readFileSync(path.resolve(__dirname, './fixtures/test-template-expected.js'), 'UTF-8'));
});
