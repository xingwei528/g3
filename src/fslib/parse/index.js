"use strict";
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var models = require('../../models');
var fslib = require('../');
function parseConfig(config, sourceDir) {
    var configJS = '';
    console.log('ss');
    configJS += 'module.exports = {';
    if (sourceDir.path) {
        configJS += "path: '" + sourceDir.path + "',";
        fslib.writeHTML(config, sourceDir.path, '');
    }
    else {
        configJS += "component: 'div',";
    }
    if (sourceDir.layout) {
        configJS += "\n    getComponent(nextState, cb) {\n        require.ensure([], (require) => {\n            cb(null, require('" + sourceDir.layout + "'));\n        });\n    },";
    }
    if (sourceDir.filenames.indexOf(models.Const.FILE_INDEX_JSX) !== -1) {
        configJS += "\n    getIndexRoute(location, cb) {\n        cb(null, {\n            getComponent(nextState, cb) {\n                require.ensure([], (require) => {\n                    cb(null, require('./index'));\n                });\n            }\n        });\n    },";
    }
    var children = sourceDir.includes;
    if (children === undefined) {
        children = sourceDir.dirnames;
    }
    if (children.length > 0) {
        configJS += "\n    getChildRoutes(location, cb) {\n        require.ensure([], (require) => {\n            cb(null, [";
        configJS += children.map(function (child) {
            return "\n    require('./" + child + "/config')";
        }).join(',');
        configJS += "\n        ]);\n      });\n    }\n    ";
    }
    configJS += '}';
    return configJS;
}
exports.parseConfig = parseConfig;
function parse(config, callback) {
    fslib.copySync(config.source, config._g3Path);
    var appPath = path.join(config._g3Path, models.Const.FILE_APP_JSX);
    if (!fslib.isFile(appPath)) {
        var appJS = "const React = require('react');\n    const ReactDOM = require('react-dom');\n    const router = require('react-router');\n    const config = require('./config');\n    ReactDOM.render(\n      <router.Router history={router." + config.history + "} routes={config}/>,\n      document.getElementById('" + models.Const.DOM_REACT_ROOT + "')\n    );";
        fslib.write(appPath, appJS);
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
                sourceDir.filenames = [];
                sourceDir.dirnames = [];
                sourceDirs.push(sourceDir);
            }
            else if (fslib.isFile(filepath)) {
                var key_1 = fslib.pathRelative(config.source, path.dirname(filepath));
                var theSourceDir = _.find(sourceDirs, function (s) {
                    return s.key === key_1;
                });
                if (theSourceDir) {
                    theSourceDir.filenames.push(path.basename(filepath).toLowerCase());
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
//# sourceMappingURL=index.js.map