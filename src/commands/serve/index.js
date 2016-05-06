"use strict";
var express = require('express');
var compression = require('compression');
var lib = require('../../lib');
var commands = require('../');
function serve(appPath) {
    var g3Config = lib.getG3Config(appPath, 'serve');
    if (!lib.isDirectory(g3Config._destinationPath)) {
        commands.build(appPath);
    }
    var app = express();
    app.use(compression());
    app.use(express.static(g3Config._destinationPath));
    var PORT = g3Config.port || 9393;
    app.listen(PORT, function () {
        console.log('G3 Production server running at localhost:' + PORT);
    });
}
exports.serve = serve;
//# sourceMappingURL=index.js.map