#!/usr/bin/env node

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const getWebpackConfig = require('./webpack.config');
const jest = require('jest');
const globby = require('globby');
const getPort = require('get-port');
const fs = require('fs-extra');
const path = require('path');
const slugify = require('slugify');
const meow = require('meow');
const chalk = require('chalk');
const { testTemplateCompiler } = require('./lib/templates/test/template');
const { entryTemplateCompiler } = require('./lib/templates/entry/template');
const { version } = require('./package.json');

const cli = meow(`
  $ vrt --help

	Usage
	  $ vrt [<file|glob> ...]

	Options
      --fail    don't update snapshots, fail if they don't match
      --watch   keep the server running, watching and recompiling your files
      --config  path to config file
      --dev     make webpack create dev bundles

    Examples
      $ vrt
      $ vrt src/button/
      $ vrt src/button/.vrt.js
      $ vrt --watch
      $ vrt --config config/vrt.config.js --watch src/**/.vrt.js
`, {
    flags: {
        fail: {
            type: 'boolean'
        },
        watch: {
            type: 'boolean'
        },
        config: {
            type: 'string'
        },
        dev: {
            type: 'string'
        }
    }
});

const testTemplate = testTemplateCompiler();
const entryTemplate = entryTemplateCompiler();
const vrtDir = path.resolve('.vrt');
const vrtTestsDir = path.resolve(vrtDir, '__tests__');
const vrtGlobalConfig = cli.flags.config
    ? require(path.resolve(cli.flags.config))
    : (
        fs.existsSync(path.resolve('./vrt.config.js'))
            ? require(path.resolve('./vrt.config'))
            : {}
    );

const webpackConfigs = [];
const testFiles = [];

if (!fs.existsSync(vrtDir)) {
    fs.mkdirSync(vrtDir);
}

if (!fs.existsSync(vrtTestsDir)) {
    fs.mkdirSync(vrtTestsDir);
}

const paths = cli.input.length
    ? cli.input.map(p => {
        if (fs.lstatSync(p).isDirectory()) {
            return path.join(path.resolve(p), '.vrt.js');
        }
        return path.resolve(p);
    })
    : path.resolve('./!(node_modules)/**/.vrt.js');

console.log(`${chalk.bgMagenta(chalk.white.bold(`vrt@${version}`))} is running with pattern: ${paths}`);

globby(paths).then(async files => {
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

        console.log();
        console.log(chalk.bold(componentName));
        presets.map((preset, presetIndex) => {
            const componentNameWithId = `${componentName}_${slugify(preset.name)}`;
            const entryFile = path.resolve(vrtDir, `${componentNameWithId}.entry.js`);
            const testFile = path.resolve(vrtTestsDir, `${componentNameWithId}.test.js`);

            const compiledTestTemplate = testTemplate({
                port,
                componentNameWithId,
                componentDir,
                name: preset.name
            });

            const compiledEntryTemplate = entryTemplate({
                configFile,
                componentDir,
                presetIndex,
                namedImport: preset.namedImport,
                vrtDir
            });
            console.log(`  ${preset.name}: ${compiledTestTemplate.pageUrl}`);
            fs.writeFileSync(testFile, compiledTestTemplate.content);
            fs.writeFileSync(entryFile, compiledEntryTemplate);

            webpackConfigs.push(getWebpackConfig({
                isDevMode: cli.flags.dev,
                componentNameWithId,
                entry: entryFile,
                outputPath: vrtDir,
                outputFilename: `${componentNameWithId}.bundle.js`,
                loaders: vrtGlobalConfig.webpack && vrtGlobalConfig.webpack.loaders || [],
                resolve: vrtGlobalConfig.webpack && vrtGlobalConfig.webpack.resolve || undefined
            }));
            testFiles.push(testFile);
        });
    });

    console.log();

    const server = new WebpackDevServer(Webpack(webpackConfigs), { stats: 'errors-only' });

    server.listen(port, 'localhost', async () => {
        await jest.run([
            '--silent',
            cli.flags.fail ? '' : '--updateSnapshot',
            '--detectOpenHandles',
            '--runTestsByPath'
        ].filter(Boolean).concat(testFiles));

        if (!cli.flags.watch) {
            server.close();
            fs.removeSync(vrtDir);
        }
    });

    process.on('SIGINT', () => {
        fs.removeSync(vrtDir);
        process.exit();
    });
});
