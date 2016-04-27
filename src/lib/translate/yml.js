"use strict";
var path = require('path');
var fse = require('fs-extra');
var yaml = require('js-yaml');
var models = require('../../models');
var lib = require('../');
function readG3Config(appPath) {
    var config = null;
    try {
        var ymlpath = path.join(appPath, models.Const.FILE_G3_YML);
        if (lib.isFile(ymlpath)) {
            config = yaml.safeLoad(fse.readFileSync(ymlpath, 'utf8'));
        }
    }
    catch (e) {
        console.log(e);
    }
    return config || new models.G3Config();
}
exports.readG3Config = readG3Config;
function readDirConfig(dirPath, filenames) {
    var config = null;
    try {
        var ymlpath = path.join(dirPath, models.Const.FILE_CONFIG_YML);
        if (filenames.indexOf(models.Const.FILE_CONFIG_YML) != -1) {
            config = yaml.safeLoad(fse.readFileSync(ymlpath, 'utf8'));
        }
    }
    catch (e) {
        console.log(e);
    }
    return config || new models.DirConfig();
}
exports.readDirConfig = readDirConfig;
//# sourceMappingURL=yml.js.map