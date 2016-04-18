"use strict";
var path = require('path');
var fse = require('fs-extra');
var _ = require('lodash');
var isFile_1 = require('./isFile');
var isDirectory_1 = require('./isDirectory');
var getPrefix_1 = require('./getPrefix');
function prepareG3(config) {
    var packagePath = path.join(config._appPath, 'package.json');
    var node_modulesPath = path.join(config._appPath, 'node_modules');
    var gitignorePath = path.join(config._appPath, '.gitignore');
    if (!isFile_1.isFile(gitignorePath)) {
        var text = 'node_modules/\n';
        text += '.g3/\n';
        text += 'public/';
        var ws = fse.createOutputStream(gitignorePath);
        ws.write(text);
    }
    if (!isFile_1.isFile(packagePath)) {
        var json = fse.readJsonSync(path.join(getPrefix_1.getPrefix(), 'node_modules', 'g3', 'package.json'));
        var ws = fse.createOutputStream(packagePath);
        ws.write(JSON.stringify(_.assign({}, {
            dependencies: json.dependencies
        })));
    }
    if (!isDirectory_1.isDirectory(node_modulesPath)) {
        console.log('please install package');
        return false;
    }
    return true;
}
exports.prepareG3 = prepareG3;
//# sourceMappingURL=prepareG3.js.map