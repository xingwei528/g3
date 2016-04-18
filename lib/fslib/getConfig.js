"use strict";
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var isFile_1 = require('./isFile');
var isDirectory_1 = require('./isDirectory');
var readFileSync_1 = require('./readFileSync');
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
        if (isFile_1.isFile(path.join(config._appPath, p))) {
            config._files.push(p);
            if (p === 'index.html') {
                config._indexContent = readFileSync_1.readFileSync(path.join(config._appPath, p));
            }
        }
        else if (isDirectory_1.isDirectory(path.join(config._appPath, p))) {
            config._directories.push(p);
        }
    });
    return config;
}
exports.getConfig = getConfig;
//# sourceMappingURL=getConfig.js.map