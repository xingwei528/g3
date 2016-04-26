"use strict";
var models = require('../../models');
var fslib = require('../');
function getConfigJSContent(config, sourceDir) {
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
        configJS += "\n    getComponent(nextState, cb) {\n        require.ensure([], (require) => {\n            cb(null, require('" + sourceDir.layout + "'));\n        });\n    },";
    }
    if (sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.jsx') !== -1
        || sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.html') !== -1) {
        configJS += "\n    getIndexRoute(location, cb) {\n        cb(null, {\n            getComponent(nextState, cb) {\n                require.ensure([], (require) => {\n                    cb(null, require('./index'));\n                });\n            }\n        });\n    },";
    }
    var children = [];
    if (sourceDir.includes && sourceDir.dirnames) {
        sourceDir.includes.forEach(function (dirname) {
            if (sourceDir.dirnames.indexOf(dirname) !== -1) {
                children.push(dirname);
            }
        });
    }
    else {
        sourceDir.dirnames.forEach(function (dirname) {
            if (sourceDir.excludes && sourceDir.excludes.indexOf(dirname) !== -1) {
                return;
            }
            children.push(dirname);
        });
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
exports.getConfigJSContent = getConfigJSContent;
//# sourceMappingURL=getConfigJSContent.js.map