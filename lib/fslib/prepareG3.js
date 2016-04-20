"use strict";
var path = require('path');
var fse = require('fs-extra');
var _ = require('lodash');
var cp = require('child_process');
var fslib = require('./');
function prepareG3(config) {
    var packagePath = path.join(config._appPath, 'package.json');
    var gitignorePath = path.join(config._appPath, '.gitignore');
    if (!fslib.isFile(gitignorePath)) {
        var text = 'node_modules/\n';
        text += '.g3/\n';
        text += 'public/';
        var ws = fse.createOutputStream(gitignorePath);
        ws.write(text);
    }
    if (!fslib.isFile(packagePath)) {
        var g3Pkg = fse.readJsonSync(path.join(fslib.getPrefix(), 'node_modules', 'g3', 'package.json'));
        fslib.write(packagePath, JSON.stringify(_.assign({}, {
            dependencies: g3Pkg.dependencies
        })));
    }
    var pkg = fse.readJsonSync(packagePath);
    _.keysIn(pkg.dependencies).forEach(function (dep) {
        if (!fslib.isDirectory(path.join(config._appPath, 'node_modules', dep))) {
            console.log('installing npm package ' + dep + '...');
            cp.execSync('npm install ' + dep);
        }
    });
    return true;
}
exports.prepareG3 = prepareG3;
//# sourceMappingURL=prepareG3.js.map