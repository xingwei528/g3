"use strict";
var express = require('express');
var compression = require('compression');
var fslib = require('../../fslib');
var commands = require('../');
function serve(appPath) {
    var config = fslib.getConfig(appPath, 'serve');
    if (!fslib.isDirectory(config.destination)) {
        commands.build(appPath);
    }
    var app = express();
    app.use(compression());
    app.use(express.static(config.destination));
    var PORT = config.port || 9393;
    app.listen(PORT, function () {
        console.log('G3 Production server running at localhost:' + PORT);
    });
}
exports.serve = serve;
//# sourceMappingURL=index.js.map