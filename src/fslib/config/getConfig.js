"use strict";
var path = require('path');
var fse = require('fs-extra');
var fslib = require('../');
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
    fse.readdirSync(config._appPath).forEach(function (p) {
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
//# sourceMappingURL=getConfig.js.map