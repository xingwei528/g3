"use strict";
var path = require('path');
var cp = require('child_process');
var fslib = require('../');
function prepareG3(config) {
    var gitignorePath = path.join(config._appPath, '.gitignore');
    if (!fslib.isFile(gitignorePath)) {
        var text = 'node_modules/\n';
        text += '.g3/\n';
        text += 'public/';
        fslib.write(gitignorePath, text);
    }
    var pkgs = [
        "react",
        "react-dom",
        "react-router"
    ];
    var devPkgs = [
        "babel",
        "babel-core",
        "babel-loader",
        "babel-preset-es2015",
        "babel-preset-react",
        "babel-preset-stage-0"
    ];
    pkgs.forEach(function (dep) {
        if (!fslib.isDirectory(path.join(config._appPath, 'node_modules', dep))) {
            console.log('Installing package ' + dep + '...');
            cp.execSync('npm install ' + dep, {
                cwd: config._appPath
            });
        }
    });
    devPkgs.forEach(function (dep) {
        if (!fslib.isDirectory(path.join(config._appPath, 'node_modules', dep))) {
            console.log('Installing package ' + dep + '...');
            cp.execSync('npm install ' + dep, {
                cwd: config._appPath
            });
        }
    });
    return true;
}
exports.prepareG3 = prepareG3;
//# sourceMappingURL=prepareG3.js.map