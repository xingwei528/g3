"use strict";
var chokidar = require('chokidar');
function watch(config) {
    var watcher = chokidar.watch(config._appPath, {
        ignored: /[\/\\]\./
    });
    var isReady = false;
    watcher
        .on('ready', function () {
        isReady = true;
    })
        .on('add', function (path) {
        if (isReady) {
            console.log(path);
        }
    })
        .on('addDir', function (path) {
    })
        .on('change', function (path) {
    })
        .on('unlink', function (path) {
    })
        .on('unlinkDir', function (path) {
    })
        .on('error', function (error) {
        console.log('Error happened', error);
    });
}
exports.watch = watch;
//# sourceMappingURL=watch.js.map