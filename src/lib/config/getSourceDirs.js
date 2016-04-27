"use strict";
var path = require('path');
var _ = require('lodash');
var models = require('../../models');
var lib = require('../');
function getSourceDirs(g3Config, dirPath, sourceDirs, isRecursive) {
    var list = lib.listSync(dirPath);
    var dirname = path.basename(dirPath).toLowerCase();
    var sourceDir = new models.SourceDir();
    sourceDir.key = lib.pathRelative(g3Config.source, dirPath);
    sourceDir.filenames = list.filenames;
    sourceDir.dirnames = list.dirnames;
    sourceDir.config = lib.readDirConfig(dirPath, list.filenames);
    if (sourceDir.config.path === undefined) {
        var parentSourceDir = null;
        var pathParent_1 = lib.pathParent(sourceDir.key);
        parentSourceDir = _.find(sourceDirs, function (s) {
            return s.key === pathParent_1;
        });
        if (parentSourceDir) {
            sourceDir.config.path = lib.pathJoin(parentSourceDir.config.path, dirname);
        }
        else {
            sourceDir.config.path = sourceDir.key;
        }
    }
    if (sourceDir.config.layout === undefined
        && (list.filenames.indexOf(models.Const.FILE_LAYOUT + '.jsx') !== -1
            || list.filenames.indexOf(models.Const.FILE_LAYOUT + '.html') !== -1)) {
        sourceDir.config.layout = './' + models.Const.FILE_LAYOUT + '.jsx';
    }
    if (sourceDir.config.excludes === undefined && list.dirnames.indexOf(models.Const.DIR_COMPONENTS) !== -1) {
        sourceDir.config.excludes = [models.Const.DIR_COMPONENTS];
    }
    sourceDirs.push(sourceDir);
    if (isRecursive && list.dirnames && list.dirnames.length > 0) {
        list.dirnames.forEach(function (dirname) {
            if (sourceDir.config.includes && sourceDir.config.includes.indexOf(dirname.toLowerCase()) === -1)
                return;
            if (sourceDir.config.excludes && sourceDir.config.excludes.indexOf(dirname.toLowerCase()) !== -1)
                return;
            var childpath = path.join(dirPath, dirname);
            getSourceDirs(g3Config, childpath, sourceDirs, isRecursive);
        });
    }
}
exports.getSourceDirs = getSourceDirs;
//# sourceMappingURL=getSourceDirs.js.map