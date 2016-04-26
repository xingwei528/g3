"use strict";
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var models = require('../../models');
var fslib = require('../');
function getSourceDirs(config, dirpath, sourceDirs, isRecursive) {
    var list = fslib.listSync(dirpath);
    var dirname = path.basename(dirpath).toLowerCase();
    var sourceDir = new models.SourceDir();
    sourceDir.key = fslib.pathRelative(config.source, dirpath);
    if (fslib.isFile(path.join(dirpath, models.Const.FILE_CONFIG_JSON))) {
        var configJSON = null;
        try {
            configJSON = JSON.parse(fse.readFileSync(path.join(dirpath, models.Const.FILE_CONFIG_JSON)).toString());
        }
        catch (e) {
            console.log(e);
        }
        if (configJSON) {
            sourceDir.path = configJSON.path;
            sourceDir.layout = configJSON.layout;
            if (configJSON.includes) {
                sourceDir.includes = _.map(configJSON.includes, function (include) {
                    return include;
                });
            }
            if (configJSON.excludes) {
                sourceDir.excludes = _.map(configJSON.excludes, function (exclude) {
                    return exclude;
                });
            }
        }
    }
    if (sourceDir.path === undefined) {
        var parentSourceDir = null;
        var pathParent_1 = fslib.pathParent(sourceDir.key);
        parentSourceDir = _.find(sourceDirs, function (s) {
            return s.key === pathParent_1;
        });
        if (parentSourceDir) {
            sourceDir.path = fslib.pathJoin(parentSourceDir.path, dirname);
        }
        else {
            sourceDir.path = sourceDir.key;
        }
    }
    sourceDir.filenames = list.filenames;
    sourceDir.dirnames = list.dirnames;
    if (sourceDir.layout === undefined
        && (list.filenames.indexOf(models.Const.FILE_LAYOUT + '.jsx') !== -1
            || list.filenames.indexOf(models.Const.FILE_LAYOUT + '.html') !== -1)) {
        sourceDir.layout = './' + models.Const.FILE_LAYOUT + '.jsx';
    }
    if (sourceDir.excludes === undefined && list.dirnames.indexOf(models.Const.DIR_COMPONENTS) !== -1) {
        sourceDir.excludes = [models.Const.DIR_COMPONENTS];
    }
    sourceDirs.push(sourceDir);
    if (isRecursive && list.dirnames && list.dirnames.length > 0) {
        list.dirnames.forEach(function (dirname) {
            if (sourceDir.includes && sourceDir.includes.indexOf(dirname.toLowerCase()) === -1)
                return;
            if (sourceDir.excludes && sourceDir.excludes.indexOf(dirname.toLowerCase()) !== -1)
                return;
            var childpath = path.join(dirpath, dirname);
            getSourceDirs(config, childpath, sourceDirs, isRecursive);
        });
    }
}
exports.getSourceDirs = getSourceDirs;
//# sourceMappingURL=getSourceDirs.js.map