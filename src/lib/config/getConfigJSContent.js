"use strict";
var models = require('../../models');
var lib = require('../');
function getConfigJSContent(g3Config, sourceDir) {
    var configJS = '';
    configJS += 'export default {';
    if (sourceDir.config.path) {
        configJS += "\n  path: '" + sourceDir.config.path + "'";
    }
    else {
        configJS += "\n  component: 'div'";
    }
    if (sourceDir.config.layout) {
        configJS += ",\n  getComponent(nextState, cb) {\n    require.ensure([], (require) => {\n      cb(null, require('" + sourceDir.config.layout + "').default);\n    });\n  }";
    }
    if (sourceDir.config.redirect) {
        var redirect = sourceDir.config.redirect;
        if (redirect[0] !== '/') {
            redirect = lib.urlJoin(lib.getRoutePath(sourceDir), redirect);
        }
        configJS += ",\n  indexRoute: {\n    onEnter: (nextState, replace) => replace('" + redirect + "')\n  }";
    }
    else {
        var index = sourceDir.config.index;
        if (index === undefined
            && (sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.jsx') !== -1
                || sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.html') !== -1)) {
            index = './index';
        }
        if (index) {
            configJS += ",\n  getIndexRoute(location, cb) {\n    cb(null, {\n      getComponent(nextState, cb) {\n        require.ensure([], (require) => {\n          cb(null, require('" + index + "').default);\n        });\n      }\n    });\n  }";
        }
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
        configJS += ",\n  getChildRoutes(location, cb) {\n    require.ensure([], (require) => {\n      cb(null, [" + children.map(function (child) {
            return "\n        require('./" + child + "/config').default";
        }).join(',') + "\n      ]);\n    });\n  }";
    }
    configJS += "\n}";
    return configJS;
}
exports.getConfigJSContent = getConfigJSContent;
//# sourceMappingURL=getConfigJSContent.js.map