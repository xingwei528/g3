"use strict";
var models = require('../../models');
var lib = require('../');
function getConfigJSContent(g3Config, sourceDir) {
    var configJS = '';
    configJS += 'module.exports = {';
    if (sourceDir.config.path) {
        configJS += "  path: '" + sourceDir.config.path + "'";
        lib.writeHTML(g3Config, sourceDir.config.path, '');
    }
    else {
        configJS += "  component: 'div'";
    }
    if (sourceDir.config.layout) {
        configJS += ",\n  getComponent(nextState, cb) {\n    require.ensure([], (require) => {\n      cb(null, require('" + sourceDir.config.layout + "'));\n    });\n  }";
    }
    var index = sourceDir.config.index;
    if (index === undefined
        && (sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.jsx') !== -1
            || sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.html') !== -1)) {
        index = './index';
    }
    if (index) {
        configJS += ",\n  getIndexRoute(location, cb) {\n    cb(null, {\n      getComponent(nextState, cb) {\n        require.ensure([], (require) => {\n          cb(null, require('" + index + "'));\n        });\n      }\n    });\n  }";
    }
    var children = [];
    if (sourceDir.config.includes && sourceDir.dirnames) {
        sourceDir.config.includes.forEach(function (dirname) {
            if (sourceDir.dirnames.indexOf(dirname) !== -1) {
                children.push(dirname);
            }
        });
    }
    else {
        sourceDir.dirnames.forEach(function (dirname) {
            if (sourceDir.config.excludes && sourceDir.config.excludes.indexOf(dirname) !== -1) {
                return;
            }
            children.push(dirname);
        });
    }
    if (children.length > 0) {
        configJS += ",\n  getChildRoutes(location, cb) {\n    require.ensure([], (require) => {\n      cb(null, [";
        configJS += children.map(function (child) {
            return "require('./" + child + "/config')";
        }).join(',');
        configJS += "\n      ]);\n    });\n  }\n  ";
    }
    configJS += '}';
    return configJS;
}
exports.getConfigJSContent = getConfigJSContent;
//# sourceMappingURL=getConfigJSContent.js.map