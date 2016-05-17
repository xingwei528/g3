"use strict";
var path = require('path');
var fse = require('fs-extra');
var yaml = require('js-yaml');
var models = require('../../models');
var lib = require('../');
function readYML(ymlPath) {
    var obj = null;
    try {
        if (lib.isFile(ymlPath)) {
            obj = yaml.safeLoad(fse.readFileSync(ymlPath, 'utf8'));
        }
    }
    catch (e) {
        console.log(e);
    }
    return obj;
}
exports.readYML = readYML;
function readDirConfig(sourceDir) {
    try {
        var ymlpath = path.join(sourceDir.path, models.Const.FILE_CONFIG_YML);
        if (sourceDir.filenames.indexOf(models.Const.FILE_CONFIG_YML) != -1) {
            sourceDir.config = yaml.safeLoad(fse.readFileSync(ymlpath, 'utf8'));
        }
    }
    catch (e) {
        console.log(e);
    }
    if (!sourceDir.config) {
        sourceDir.config = new models.DirConfig();
    }
    if (sourceDir.config.path === undefined) {
        if (sourceDir.key === '/') {
            sourceDir.config.path = '/';
        }
        else {
            sourceDir.config.path = path.basename(sourceDir.path).toLowerCase();
        }
    }
    if (sourceDir.config.layout === undefined) {
        if (sourceDir.filenames.indexOf(models.Const.FILE_LAYOUT + '.jsx') !== -1 || sourceDir.filenames.indexOf(models.Const.FILE_LAYOUT + '.html') !== -1) {
            sourceDir.config.layout = './' + models.Const.FILE_LAYOUT + '.jsx';
        }
    }
    if (sourceDir.config.excludes === undefined) {
        if (sourceDir.dirnames.indexOf(models.Const.DIR_COMPONENTS) !== -1) {
            sourceDir.config.excludes = [models.Const.DIR_COMPONENTS];
        }
    }
}
exports.readDirConfig = readDirConfig;
//# sourceMappingURL=yml.js.map