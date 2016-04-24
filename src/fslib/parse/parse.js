"use strict";
var path = require('path');
var models = require('../../models');
var fslib = require('../');
function parse(config, callback) {
    fslib.copySync(config.source, config._g3Path);
    var appPath = path.join(config._g3Path, models.Const.FILE_APP_JSX);
    if (!fslib.isFile(appPath)) {
        var appJS = "const React = require('react');\n    const ReactDOM = require('react-dom');\n    const router = require('react-router');\n    const config = require('./config');\n    ReactDOM.render(\n      <router.Router history={router." + config.history + "} routes={config}/>,\n      document.getElementById('" + models.Const.DOM_REACT_ROOT + "')\n    );";
        fslib.write(appPath, appJS);
    }
    var sourceDirs = [];
    fslib.parseDir(config, config.source, sourceDirs, true);
    sourceDirs.forEach(function (sourceDir) {
        var configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS);
        var configContent = fslib.getConfigJSContent(config, sourceDir);
        fslib.write(configPath, configContent);
    });
    fslib.writeDATA(config);
    callback(sourceDirs);
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map