import test from 'ava';
import { entryTemplateCompiler } from '../template';
import fs from 'fs';
import path from 'path';

test('should get entry file content', t => {
    const template = entryTemplateCompiler();

    const content = template({
        configFile: path.resolve(__dirname, './fixtures/template-config.js'),
        componentDir: './components/foobar',
        vrtDir: '.vrt/',
        presetIndex: 6
    });

    t.is(content, fs.readFileSync(path.resolve(__dirname, './fixtures/template-expected.js'), 'UTF-8'));
});
