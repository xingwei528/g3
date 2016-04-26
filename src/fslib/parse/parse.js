"use strict";
var path = require('path');
var models = require('../../models');
var fslib = require('../');
function parse(config) {
    var sourceDirs = [];
    if (!fslib.isDirectory(config.source))
        return sourceDirs;
    if (!fslib.prepareG3(config))
        return sourceDirs;
    fslib.copySync(config.source, config._g3Path);
    if (!fslib.isFile(path.join(config._g3Path, models.Const.FILE_APP) + '.jsx') && !fslib.isFile(path.join(config._g3Path, models.Const.FILE_APP) + '.html')) {
        var appJS = "const React = require('react');\n    const ReactDOM = require('react-dom');\n    const router = require('react-router');\n    const config = require('./config');\n    ReactDOM.render(\n      <router.Router history={router." + config.history + "} routes={config}/>,\n      document.getElementById('" + models.Const.DOM_REACT_ROOT + "')\n    );";
        fslib.write(path.join(config._g3Path, models.Const.FILE_APP + '.jsx'), appJS);
    }
    fslib.getSourceDirs(config, config.source, sourceDirs, true);
    sourceDirs.forEach(function (sourceDir) {
        var configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS);
        var configContent = fslib.getConfigJSContent(config, sourceDir);
        fslib.write(configPath, configContent);
        sourceDir.filenames.forEach(function (filename) {
            if (path.extname(filename) === '.html') {
                var htmlPath = path.join(config._g3Path, sourceDir.key, filename);
                var jsxPath = path.join(config._g3Path, sourceDir.key, filename.substring(0, filename.lastIndexOf('.')) + '.jsx');
                var html = fslib.readFileSync(htmlPath);
                var jsx = fslib.createReactComponent(html);
                fslib.write(jsxPath, jsx);
            }
        });
    });
    fslib.writeDATA(config);
    return sourceDirs;
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map