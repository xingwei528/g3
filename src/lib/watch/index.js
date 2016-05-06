"use strict";
var path = require('path');
var _ = require('lodash');
var chokidar = require('chokidar');
var models = require('../../models');
var lib = require('../');
function syncFile(g3Config, sourceDirs, p) {
    var ext = path.extname(p);
    var dirpath = path.dirname(p);
    var filename = path.basename(p);
    if (dirpath === g3Config._g3Path || dirpath === g3Config._destinationPath)
        return;
    var rel = lib.pathRelative(g3Config._sourcePath, p);
    var g3Path = path.join(g3Config._g3Path, lib.pathRelative(g3Config._sourcePath, p));
    if (ext === '.js' || ext === '.jsx') {
        lib.readFile(p, function (error, data) {
            if (error) {
                console.log('Error happened', error);
            }
            else {
                lib.writeSync(g3Path, data);
                console.log('file changed: ' + rel);
            }
        });
    }
    else if (filename == models.Const.FILE_CONFIG_YML) {
        var dirpath_1 = path.dirname(p);
        var key_1 = lib.pathRelative(g3Config._sourcePath, dirpath_1);
        var sourceDir = _.find(sourceDirs, function (s) {
            return s.key = key_1;
        });
        console.log(sourceDir);
        if (sourceDir) {
            var configPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS);
            var configContent = lib.getConfigJSContent(g3Config, sourceDir);
            lib.writeSync(configPath, configContent);
        }
    }
    else {
        var g3PublicPath = path.join(g3Config._destinationPath, lib.pathRelative(g3Config._appPath, p));
        lib.copy(p, g3PublicPath, function (err) {
            if (err) {
                console.log('error: ' + err);
            }
            else {
                console.log(p + ' changed');
            }
        });
    }
}
function syncDir(g3Config, sourceDirs, p) {
}
function watch(config, sourceDirs) {
    if (!sourceDirs || sourceDirs.length === 0)
        return;
    var watcher = chokidar.watch(config._appPath, {
        ignored: /\.git|node_modules|bower_components|\.sass\-cache|[\/\\]\./
    });
    var isReady = false;
    watcher
        .on('ready', function () {
        isReady = true;
    })
        .on('add', function (p) {
        if (!isReady)
            return;
        syncFile(config, sourceDirs, p);
    })
        .on('addDir', function (p) {
        if (!isReady)
            return;
        syncDir(config, sourceDirs, p);
    })
        .on('change', function (p) {
        if (!isReady)
            return;
        syncFile(config, sourceDirs, p);
    })
        .on('error', function (error) {
        console.log('Error happened', error);
    });
}
exports.watch = watch;
//# sourceMappingURL=index.js.map