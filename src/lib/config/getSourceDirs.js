"use strict";
var path = require('path');
var models = require('../../models');
var lib = require('../');
function getRoutePath(sourceDir) {
    if (sourceDir.parent) {
        return lib.urlJoin(getRoutePath(sourceDir.parent), sourceDir.config.path);
    }
    return sourceDir.config.path;
}
exports.getRoutePath = getRoutePath;
function getSourceDirs(g3Config, dirPath, parent, sourceDirs) {
    var list = lib.listSync(dirPath);
    var sourceDir = new models.SourceDir();
    sourceDir.key = lib.pathRelative(g3Config.source, dirPath);
    sourceDir.path = dirPath;
    sourceDir.filenames = list.filenames;
    sourceDir.dirnames = list.dirnames;
    sourceDir.parent = parent;
    lib.readDirConfig(sourceDir);
    sourceDirs.push(sourceDir);
    if (list.dirnames && list.dirnames.length > 0) {
        list.dirnames.forEach(function (dirname) {
            if (sourceDir.config.includes && sourceDir.config.includes.indexOf(dirname.toLowerCase()) === -1)
                return;
            if (sourceDir.config.excludes && sourceDir.config.excludes.indexOf(dirname.toLowerCase()) !== -1)
                return;
            var childpath = path.join(dirPath, dirname);
            getSourceDirs(g3Config, childpath, sourceDir, sourceDirs);
        });
    }
}
exports.getSourceDirs = getSourceDirs;
//# sourceMappingURL=getSourceDirs.js.map