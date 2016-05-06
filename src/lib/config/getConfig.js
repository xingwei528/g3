"use strict";
var path = require('path');
var fse = require('fs-extra');
var models = require('../../models');
var lib = require('../');
function getG3Config(appPath, command) {
    appPath = path.resolve(appPath);
    var config = lib.readG3Config(appPath);
    config._appPath = appPath;
    config._g3Path = path.join(appPath, models.Const.DIR_DOT_G3);
    config._dataPath = path.join(appPath, models.Const.DIR_DATA);
    if (!config.source) {
        config.source = './' + models.Const.DIR_SRC;
    }
    if (!config.destination) {
        config.destination = './' + models.Const.DIR_PUBLIC;
    }
    config._sourcePath = path.join(config._appPath, config.source);
    config._destinationPath = command === 'run' ? path.join(config._g3Path, 'public') : path.join(config._appPath, config.destination);
    config._timeStamp = Math.floor(Date.now() / 1000);
    if (!config.history) {
        config.history = 'browserHistory';
    }
    config._files = [];
    config._directories = [];
    fse.readdirSync(config._appPath).forEach(function (p) {
        if (lib.isFile(path.join(config._appPath, p))) {
            config._files.push(p);
            if (p === models.Const.FILE_INDEX + '.html') {
                config._indexContent = lib.readFileSync(path.join(config._appPath, p));
            }
        }
        else if (lib.isDirectory(path.join(config._appPath, p))) {
            config._directories.push(p);
        }
    });
    return config;
}
exports.getG3Config = getG3Config;
//# sourceMappingURL=getConfig.js.map