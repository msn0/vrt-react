import test from 'ava';
import { testTemplateCompiler } from '../test-template';
import fs from 'fs';
import path from 'path';

test('should get test file content', t => {
    const template = testTemplateCompiler();

    const content = template({
        port: 1234,
        componentNameWithId: 'foo-bar',
        componentDir: 'foo/bar',
        name: 'Preset Name'
    });

    t.is(content, fs.readFileSync(path.resolve(__dirname, './fixtures/expected.js'), 'UTF-8'));
});
