"use strict";
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var models = require('../../models');
var fslib = require('../');
function parseDir(config, dirpath, sourceDirs, isRecursive) {
    var list = fslib.listSync(dirpath);
    var dirname = path.basename(dirpath).toLowerCase();
    var sourceDir = new models.SourceDir();
    sourceDir.key = fslib.pathRelative(config.source, dirpath);
    var pathParent = fslib.pathParent(sourceDir.key);
    var parentSourceDir = null;
    parentSourceDir = _.find(sourceDirs, function (s) {
        return s.key === pathParent;
    });
    if (parentSourceDir) {
        if (parentSourceDir.includes) {
            if (parentSourceDir.includes.indexOf(dirname) === -1) {
                return;
            }
        }
        else if (parentSourceDir.excludes) {
            if (parentSourceDir.excludes.indexOf(dirname) !== -1) {
                return;
            }
        }
    }
    if (fslib.isFile(path.join(dirpath, models.Const.FILE_CONFIG_JSON))) {
        var configJSON = null;
        try {
            configJSON = JSON.parse(fse.readFileSync(path.join(dirpath, models.Const.FILE_CONFIG_JSON)).toString());
        }
        catch (e) {
            console.log(e);
        }
        if (configJSON) {
            sourceDir.path = configJSON.path;
            sourceDir.layout = configJSON.layout;
            sourceDir.includes = configJSON.includes;
            sourceDir.excludes = configJSON.excludes;
        }
    }
    if (sourceDir.path === undefined) {
        if (parentSourceDir) {
            sourceDir.path = fslib.pathJoin(parentSourceDir.path, dirname);
        }
        else {
            sourceDir.path = sourceDir.key;
        }
    }
    sourceDir.filenames = list.filenames;
    sourceDir.dirnames = list.dirnames;
    sourceDirs.push(sourceDir);
    if (isRecursive && list.dirnames && list.dirnames.length > 0) {
        list.dirnames.forEach(function (dirname) {
            var childpath = path.join(dirpath, dirname);
            parseDir(config, childpath, sourceDirs, isRecursive);
        });
    }
}
exports.parseDir = parseDir;
function parse(config, callback) {
    fslib.copySync(config.source, config._g3Path);
    var appPath = path.join(config._g3Path, models.Const.FILE_APP_JSX);
    if (!fslib.isFile(appPath)) {
        var appJS = "const React = require('react');\n    const ReactDOM = require('react-dom');\n    const router = require('react-router');\n    const config = require('./config');\n    ReactDOM.render(\n      <router.Router history={router." + config.history + "} routes={config}/>,\n      document.getElementById('" + models.Const.DOM_REACT_ROOT + "')\n    );";
        fslib.write(appPath, appJS);
    }
    var sourceDirs = [];
    parseDir(config, config.source, sourceDirs, true);
    sourceDirs.forEach(function (sourceDir) {
        var configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS);
        var configContent = fslib.getConfigJSContent(config, sourceDir);
        fslib.write(configPath, configContent);
    });
    fslib.writeDATA(config);
    callback(sourceDirs);
}
exports.parse = parse;
//# sourceMappingURL=index.js.map