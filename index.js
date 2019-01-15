#!/usr/bin/env node

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const getWebpackConfig = require('./webpack.config');
const jest = require('jest');
const glob = require('glob');
const getPort = require('get-port');
const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');
const slugify = require('slugify');
const meow = require('meow');

const cli = meow(`
	Usage
	  $ npx vrt

	Options
      --fail    don't update snapshots, fail if they don't match
      --config  path to config file
`, {
    flags: {
        fail: {
            type: 'boolean'
        },
        config: {
            type: 'string'
        }
    }
});

const testTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, './test-template.ejs'), 'UTF-8'));
const entryTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, './entry-template.ejs'), 'UTF-8'));
const vrtDir = path.resolve('.vrt');
const vrtTestsDir = path.resolve(vrtDir, '__tests__');
const vrtGlobalConfig = cli.flags.config
    ? require(path.resolve(cli.flags.config))
    : (
        fs.existsSync(path.resolve('./vrt.config.js'))
            ? require(path.resolve('./vrt.config'))
            : {}
    );

const webpackConfig = [];
const testFiles = [];

if (!fs.existsSync(vrtDir)) {
    fs.mkdirSync(vrtDir);
}

if (!fs.existsSync(vrtTestsDir)) {
    fs.mkdirSync(vrtTestsDir);
}

glob(path.resolve('./!(node_modules)/**/.vrt.js'), { absolute: true }, async (error, files) => {
    const port = await getPort();
    files.forEach(async (configFile) => {
        const config = require(configFile);
        const componentDir = path.dirname(configFile);
        const componentFile = path.resolve(componentDir, config.main);
        const componentName = path.basename(componentFile, '.js');
        const presets = config.presets
            && config.presets.length > 0
            && config.presets
            || [{ name: componentName }];

        presets.map(({ name }, presetIndex) => {
            const componentNameWithId = `${componentName}_${slugify(name)}`;
            const entryFile = path.resolve(vrtDir, `${componentNameWithId}.entry.js`);
            const testFile = path.resolve(vrtTestsDir, `${componentNameWithId}.test.js`);

            const testFileContent = testTemplate({
                port,
                file: `${componentNameWithId}.html`,
                screensDir: path.resolve(componentDir, '__screenshots__'),
                describe: path.parse(path.parse(path.resolve(componentDir, '__screenshots__')).dir).base + '/__screenshots__',
                snapshotName: slugify(name),
                ci: cli.flags.ci
            });
            const entryFileContent = entryTemplate({
                configFile,
                componentFile,
                presetIndex
            });

            fs.writeFileSync(testFile, testFileContent);
            fs.writeFileSync(entryFile, entryFileContent);

            webpackConfig.push(getWebpackConfig({
                componentNameWithId,
                entry: entryFile,
                outputPath: vrtDir,
                outputFilename: `${componentNameWithId}.bundle.js`,
                loaders: vrtGlobalConfig.webpack && vrtGlobalConfig.webpack.loaders || []
            }));
            testFiles.push(testFile);
        });
    });

    const server = new WebpackDevServer(Webpack(webpackConfig), { stats: 'errors-only' });

    server.listen(port, 'localhost', async () => {
        await jest.run([
            '--silent',
            '--verbose',
            cli.flags.fail ? '' : '--updateSnapshot',
            '--detectOpenHandles',
            '--runTestsByPath'
        ].filter(Boolean).concat(testFiles));

        server.close();
        fs.removeSync(vrtDir);
    });
});
