const chalk = require('chalk');

class MyCustomReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
        console.log();
    }

    onRunComplete(contexts, results) {
        console.log(results.testResults[0].testResults[0]);
        const result = results.testResults[0].testResults[0];
        console.log(`${result.status === 'passed' ? chalk.green(' ✔ ') : chalk.red(' ✘ ')}${result.ancestorTitles[0]}`);
    }
}

module.exports = MyCustomReporter;
