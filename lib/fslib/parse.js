"use strict";
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var fm = require('front-matter');
var models = require('../models');
var fslib = require('./');
function parseConfig(config, sourceDir) {
    var configJS = '';
    configJS += 'module.exports = {';
    if (sourceDir.path) {
        configJS += "path: '" + sourceDir.path + "',";
        fslib.writeHTML(config, sourceDir.path, '');
    }
    else {
        configJS += "component: 'div',";
    }
    if (sourceDir.layout) {
        configJS += "getComponent(nextState, cb) {";
        configJS += "    require.ensure([], (require) => {";
        configJS += "        cb(null, require('" + sourceDir.layout + "'));";
        configJS += "    });";
        configJS += "},";
    }
    if (sourceDir.filenames.indexOf(models.Const.FILE_INDEX_JSX) !== -1) {
        configJS += "getIndexRoute(location, cb) {";
        configJS += "    cb(null, {";
        configJS += "        getComponent(nextState, cb) {";
        configJS += "            require.ensure([], (require) => {";
        configJS += "                cb(null, require('./index'));";
        configJS += "            });";
        configJS += "        }";
        configJS += "    });";
        configJS += "},";
    }
    var children = sourceDir.includes;
    if (children === undefined) {
        children = sourceDir.dirnames;
    }
    if (children.length > 0) {
        configJS += "getChildRoutes(location, cb) {";
        configJS += "    require.ensure([], (require) => {";
        configJS += "        cb(null, [";
        configJS += children.map(function (child) {
            return "require('./" + child + "/config')";
        }).join(',');
        configJS += "        ]);";
        configJS += "    });";
        configJS += "}";
    }
    configJS += '}';
    return configJS;
}
exports.parseConfig = parseConfig;
function parse(config, callback) {
    fslib.copySync(config.source, config._g3Path);
    var appPath = path.join(config._g3Path, models.Const.FILE_APP_JSX);
    if (!fslib.isFile(appPath)) {
        var appJS = "const React = require('react');";
        appJS += "const ReactDOM = require('react-dom');";
        appJS += "const router = require('react-router');";
        appJS += "const config = require('./config');";
        appJS += "ReactDOM.render(";
        appJS += "  <router.Router history={router." + config.history + "} routes={config}/>,";
        appJS += "  document.getElementById('" + models.Const.DOM_REACT_ROOT + "')";
        appJS += ");";
        fse.createOutputStream(appPath).write(appJS);
    }
    var sourceDirs = [];
    fse.walk(config.source).on('readable', function () {
        var item;
        var _loop_1 = function() {
            var filepath = item.path;
            if (fslib.isDirectory(filepath)) {
                var dirpath = filepath;
                var dirname = path.basename(dirpath).toLowerCase();
                var sourceDir = new models.SourceDir();
                sourceDir.key = fslib.pathRelative(config.source, dirpath);
                var pathParent_1 = fslib.pathParent(sourceDir.key);
                var parentSourceDir = null;
                parentSourceDir = _.find(sourceDirs, function (s) {
                    return s.key === pathParent_1;
                });
                if (parentSourceDir) {
                    if (parentSourceDir.includes) {
                        if (parentSourceDir.includes.indexOf(dirname) === -1) {
                            return "continue";
                        }
                    }
                    else if (parentSourceDir.excludes) {
                        if (parentSourceDir.excludes.indexOf(dirname) !== -1) {
                            return "continue";
                        }
                    }
                    parentSourceDir.dirnames.push(dirname);
                }
                if (fslib.isFile(path.join(dirpath, models.Const.FILE_CONFIG_JSON))) {
                    var configJSON = null;
                    try {
                        configJSON = JSON.parse(fse.readFileSync(path.join(dirpath, models.Const.FILE_CONFIG_JSON)).toString());
                    }
                    catch (e) { }
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
                sourceDir.filenames = [];
                sourceDir.dirnames = [];
                sourceDirs.push(sourceDir);
            }
            else if (fslib.isFile(filepath)) {
                var key_1 = fslib.pathRelative(config.source, path.dirname(filepath));
                var sourceDir = _.find(sourceDirs, function (s) {
                    return s.key === key_1;
                });
                if (sourceDir) {
                    sourceDir.filenames.push(path.basename(filepath).toLowerCase());
                }
            }
        };
        while (item = this.read()) {
            _loop_1();
        }
    }).on('end', function () {
        sourceDirs.forEach(function (sourceDir) {
            var configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS);
            var configContent = parseConfig(config, sourceDir);
            fslib.write(configPath, configContent);
        });
        fslib.writeDATA(config);
        callback(sourceDirs);
    });
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map