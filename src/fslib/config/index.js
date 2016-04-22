"use strict";
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var cp = require('child_process');
var fslib = require('../');
function prepareG3(config) {
    var packagePath = path.join(config._appPath, 'package.json');
    var gitignorePath = path.join(config._appPath, '.gitignore');
    if (!fslib.isFile(gitignorePath)) {
        var text = 'node_modules/\n';
        text += '.g3/\n';
        text += 'public/';
        fslib.write(gitignorePath, text);
    }
    if (!fslib.isFile(packagePath)) {
        var g3Pkg = fse.readJsonSync(path.join(fslib.getPrefix(), 'node_modules', 'g3', 'package.json'));
        fslib.write(packagePath, JSON.stringify(_.assign({}, {
            dependencies: g3Pkg.dependencies
        })));
    }
    var pkg = fse.readJsonSync(packagePath);
    _.keysIn(pkg.dependencies).forEach(function (dep) {
        if (!fslib.isDirectory(path.join(config._appPath, 'node_modules', dep))) {
            console.log('installing npm package ' + dep + '...');
            cp.execSync('npm install ' + dep);
        }
    });
    return true;
}
exports.prepareG3 = prepareG3;
function getConfig(appPath, command) {
    appPath = path.resolve(appPath);
    var config = JSON.parse(fse.readFileSync(path.join(appPath, 'g3.json')).toString());
    config._appPath = appPath;
    config._g3Path = path.join(appPath, '.g3');
    config._command = command;
    if (!config.source) {
        config.source = "./src";
    }
    if (!config.destination) {
        config.destination = "./public";
    }
    config.source = path.join(config._appPath, config.source);
    config.destination = config._command === 'run' ? path.join(config._g3Path, 'public') : path.join(config._appPath, config.destination);
    if (!config.history) {
        config.history = "browserHistory";
    }
    config._files = [];
    config._directories = [];
    fs.readdirSync(config._appPath).forEach(function (p) {
        if (fslib.isFile(path.join(config._appPath, p))) {
            config._files.push(p);
            if (p === 'index.html') {
                config._indexContent = fslib.readFileSync(path.join(config._appPath, p));
            }
        }
        else if (fslib.isDirectory(path.join(config._appPath, p))) {
            config._directories.push(p);
        }
    });
    return config;
}
exports.getConfig = getConfig;
//# sourceMappingURL=index.js.map