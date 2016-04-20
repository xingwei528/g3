"use strict";
var path = require('path');
var chokidar = require('chokidar');
var fslib = require('./');
function syncFile(config, p) {
    var ext = path.extname(p);
    if (ext === '.js' || ext === '.jsx') {
        var rel = fslib.pathRelative(config.source, p);
        var g3Path = path.join(config._g3Path, fslib.pathRelative(config.source, p));
        fslib.write(g3Path, fslib.readFileSync(p));
        console.log('file changed: ' + rel);
    }
}
function watch(config) {
    var watcher = chokidar.watch(config._appPath, {
        ignored: /\.git|node_modules|bower_components|\.sass\-cache|[\/\\]\./
    });
    var isReady = false;
    watcher
        .on('ready', function () {
        isReady = true;
    })
        .on('add', function (p) {
        if (isReady) {
            syncFile(config, p);
        }
    })
        .on('addDir', function (p) {
    })
        .on('change', function (p) {
        if (isReady) {
            syncFile(config, p);
        }
    })
        .on('unlink', function (p) {
    })
        .on('unlinkDir', function (p) {
    })
        .on('error', function (error) {
        console.log('Error happened', error);
    });
}
exports.watch = watch;
//# sourceMappingURL=watch.js.map