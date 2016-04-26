"use strict";
var path = require('path');
var _ = require('lodash');
var chokidar = require('chokidar');
var models = require('../../models');
var fslib = require('../');
function syncFile(config, sourceDirs, p) {
    var ext = path.extname(p);
    var dirpath = path.dirname(p);
    var filename = path.basename(p);
    if (dirpath === config._g3Path || dirpath === config.destination)
        return;
    var rel = fslib.pathRelative(config.source, p);
    var g3Path = path.join(config._g3Path, fslib.pathRelative(config.source, p));
    if (ext === '.js' || ext === '.jsx') {
        fslib.readFile(p, function (error, data) {
            if (error) {
                console.log('Error happened', error);
            }
            else {
                fslib.write(g3Path, data);
                console.log('file changed: ' + rel);
            }
        });
    }
    else if (filename == 'config.json') {
        var dirpath_1 = path.dirname(p);
        var key_1 = fslib.pathRelative(config.source, dirpath_1);
        var sourceDir = _.find(sourceDirs, function (s) {
            return s.key = key_1;
        });
        console.log(sourceDir);
        if (sourceDir) {
            var configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS);
            var configContent = fslib.getConfigJSContent(config, sourceDir);
            fslib.write(configPath, configContent);
        }
    }
    else {
        var g3PublicPath = path.join(config.destination, fslib.pathRelative(config._appPath, p));
        fslib.copy(p, g3PublicPath, function (err) {
            if (err) {
                console.log('error: ' + err);
            }
            else {
                console.log(p + ' changed');
            }
        });
    }
}
function syncDir(config, sourceDirs, p) {
    console.log(p);
    fslib.parseDir(config, p, sourceDirs, false);
}
function watch(config, sourceDirs) {
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