#!/usr/bin/env node
"use strict";
var program = require('commander');
var packageJson = require('../../package.json');
var commands = require('../commands');
program
    .version(packageJson.version)
    .option('-C, --chdir <path>', 'change the working directory')
    .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
    .option('-T, --no-tests', 'ignore test hook');
program
    .command('build [directory]')
    .alias('b')
    .description('run setup commands for all directorys')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function (directory, options) {
    var mode = options.setup_mode || "normal";
    directory = directory || './';
    commands.build(directory);
});
program
    .command('run [directory]')
    .alias('r')
    .description('run setup commands for all directorys')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function (directory, options) {
    var mode = options.setup_mode || "normal";
    directory = directory || './';
    commands.run(directory);
});
program
    .command('serve [directory]')
    .alias('s')
    .description('execute the given remote directory')
    .option("-e, --exec_mode <mode>", "Which exec mode to use")
    .action(function (directory, options) {
    directory = directory || './';
    commands.serve(directory);
}).on('--help', function () {
    console.log('  Examples:');
    console.log();
    console.log('    $ deploy exec sequential');
    console.log('    $ deploy exec async');
    console.log();
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map