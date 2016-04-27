"use strict";
var path = require('path');
var models = require('../../models');
var lib = require('../');
function getSourceDirs(g3Config, dirPath, sourceDirs, isRecursive) {
    var list = lib.listSync(dirPath);
    var sourceDir = new models.SourceDir();
    sourceDir.key = lib.pathRelative(g3Config.source, dirPath);
    sourceDir.path = dirPath;
    sourceDir.filenames = list.filenames;
    sourceDir.dirnames = list.dirnames;
    lib.readDirConfig(sourceDir);
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