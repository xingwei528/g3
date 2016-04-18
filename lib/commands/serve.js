"use strict";
var express = require('express');
var path = require('path');
var compression = require('compression');
var fs = require('fs-extra');
var fslib = require('../fslib');
function serve(appPath) {
    var config = fslib.getConfig(appPath, 'serve');
    var app = express();
    app.use(compression());
    app.use(express.static(config.destination));
    var PORT = process.env.PORT || 9393;
    app.listen(PORT, function () {
        console.log('G3 Production server running at localhost:' + PORT);
    });
}
exports.serve = serve;
//# sourceMappingURL=serve.js.map