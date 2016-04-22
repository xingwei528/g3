"use strict";
var express = require('express');
var compression = require('compression');
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