"use strict";
var path = require('path');
var fse = require('fs-extra');
var fm = require('front-matter');
var models = require('../models');
var copySync_1 = require('./copySync');
var removeSync_1 = require('./removeSync');
var isFile_1 = require('./isFile');
var writeHTML_1 = require('./writeHTML');
var writeDATA_1 = require('./writeDATA');
function parseConfig(config, dirpath, filepath) {
    var configJSON = JSON.parse(fse.readFileSync(filepath).toString());
    var configJS = '';
    configJS += 'module.exports = {';
    if (configJSON.path) {
        configJS += "path: '" + configJSON.path + "',";
        writeHTML_1.writeHTML(config, configJSON.path, '');
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
    if (isFile_1.isFile(path.join(dirpath, models.Const.FILE_INDEX_JSX))) {
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
    if (configJSON.children && configJSON.children.length > 0) {
        configJS += "getChildRoutes(location, cb) {";
        configJS += "    require.ensure([], (require) => {";
        configJS += "        cb(null, [";
        configJS += configJSON.children.map(function (child) {
            return "require('" + child + "/config')";
        }).join(',');
        configJS += "        ]);";
        configJS += "    });";
        configJS += "}";
    }
    configJS += '}';
    return configJS;
}
function parse(config, callback) {
    copySync_1.copySync(config.source, config._g3Path);
    var appJS = "const React = require('react');";
    appJS += "const ReactDOM = require('react-dom');";
    appJS += "const router = require('react-router');";
    appJS += "const config = require('./config');";
    appJS += "ReactDOM.render(";
    appJS += "  <router.Router history={router." + config.history + "} routes={config}/>,";
    appJS += "  document.getElementById('" + models.Const.DOM_REACT_ROOT + "')";
    appJS += ");";
    fse.createOutputStream(path.join(config._g3Path, models.Const.FILE_APP_JSX)).write(appJS);
    fse.walk(config._g3Path).on('readable', function () {
        var item;
        while (item = this.read()) {
            var filepath = item.path;
            if (isFile_1.isFile(filepath)) {
                if (path.basename(filepath) === models.Const.FILE_CONFIG_JSON) {
                    var dirpath = path.dirname(filepath);
                    var ws = fse.createOutputStream(path.join(dirpath, 'config.js'));
                    ws.write(parseConfig(config, dirpath, filepath));
                    removeSync_1.removeSync(filepath);
                }
            }
        }
    }).on('end', function () {
        writeDATA_1.writeDATA(config);
        callback();
    });
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map