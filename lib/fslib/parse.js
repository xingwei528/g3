"use strict";
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var fm = require('front-matter');
var models = require('../models');
var fslib = require('./');
function parseConfig(config, sourceDir) {
    var configJSON = sourceDir.config;
    var configJS = '';
    configJS += 'module.exports = {';
    if (configJSON.path) {
        configJS += "path: '" + configJSON.path + "',";
        fslib.writeHTML(config, configJSON.path, '');
    }
    else {
        configJS += "component: 'div',";
    }
    if (configJSON.layout) {
        configJS += "getComponent(nextState, cb) {";
        configJS += "    require.ensure([], (require) => {";
        configJS += "        cb(null, require('" + configJSON.layout + "'));";
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
    var children = sourceDir.config.includes;
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
function parse(config, callback) {
    fslib.copySync(config.source, config._g3Path);
    var appJS = "const React = require('react');";
    appJS += "const ReactDOM = require('react-dom');";
    appJS += "const router = require('react-router');";
    appJS += "const config = require('./config');";
    appJS += "ReactDOM.render(";
    appJS += "  <router.Router history={router." + config.history + "} routes={config}/>,";
    appJS += "  document.getElementById('" + models.Const.DOM_REACT_ROOT + "')";
    appJS += ");";
    fse.createOutputStream(path.join(config._g3Path, models.Const.FILE_APP_JSX)).write(appJS);
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
                    if (parentSourceDir.config.includes) {
                        if (parentSourceDir.config.includes.indexOf(dirname) === -1) {
                            return "continue";
                        }
                    }
                    else if (parentSourceDir.config.excludes) {
                        if (parentSourceDir.config.excludes.indexOf(dirname) !== -1) {
                            return "continue";
                        }
                    }
                    parentSourceDir.dirnames.push(dirname);
                }
                var configJSON = new models.ConfigJSON();
                if (fslib.isFile(path.join(dirpath, models.Const.FILE_CONFIG_JSON))) {
                    configJSON = JSON.parse(fse.readFileSync(path.join(dirpath, models.Const.FILE_CONFIG_JSON)).toString());
                }
                if (configJSON.path === undefined) {
                    if (parentSourceDir) {
                        configJSON.path = fslib.pathJoin(parentSourceDir.config.path, dirname);
                    }
                    else {
                        configJSON.path = sourceDir.key;
                    }
                }
                sourceDir.config = configJSON;
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
            var ws = fse.createOutputStream(path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS));
            ws.write(parseConfig(config, sourceDir));
        });
        fslib.writeDATA(config);
        callback();
    });
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map