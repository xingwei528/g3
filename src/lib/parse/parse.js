"use strict";
var path = require('path');
var models = require('../../models');
var lib = require('../');
function parse(g3Config) {
    var sourceDirs = [];
    if (!lib.isDirectory(g3Config.source))
        return sourceDirs;
    if (!lib.prepareG3(g3Config))
        return sourceDirs;
    lib.copySync(g3Config.source, g3Config._g3Path);
    if (!lib.isFile(path.join(g3Config._g3Path, models.Const.FILE_APP) + '.jsx') && !lib.isFile(path.join(g3Config._g3Path, models.Const.FILE_APP) + '.html')) {
        var appJS = "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport {Router} from 'react-router';\nimport config from './config';\nReactDOM.render(\n  <Router history={router." + g3Config.history + "} routes={config}/>,\n  document.getElementById('" + models.Const.DOM_REACT_ROOT + "')\n);";
        lib.write(path.join(g3Config._g3Path, models.Const.FILE_APP + '.jsx'), appJS);
    }
    lib.getSourceDirs(g3Config, g3Config.source, sourceDirs, true);
    sourceDirs.forEach(function (sourceDir) {
        var configPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS);
        var configContent = lib.getConfigJSContent(g3Config, sourceDir);
        lib.write(configPath, configContent);
        sourceDir.filenames.forEach(function (filename) {
            if (path.extname(filename) === '.html') {
                var htmlPath = path.join(g3Config._g3Path, sourceDir.key, filename);
                var jsxPath = path.join(g3Config._g3Path, sourceDir.key, filename.substring(0, filename.lastIndexOf('.')) + '.jsx');
                var html = lib.readFileSync(htmlPath);
                var jsx = lib.getJSXContent(html, sourceDir.components);
                lib.write(jsxPath, jsx);
            }
        });
    });
    lib.writeDATA(g3Config);
    return sourceDirs;
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map