"use strict";
var path = require('path');
var cp = require('child_process');
var lib = require('../');
function prepareG3(g3Config) {
    var gitignorePath = path.join(g3Config._appPath, '.gitignore');
    if (!lib.isFile(gitignorePath)) {
        var text = 'node_modules/\n';
        text += '.g3/\n';
        text += 'public/';
        lib.write(gitignorePath, text);
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
        if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
            console.log('Installing package ' + dep + '...');
            cp.execSync('npm install ' + dep, {
                cwd: g3Config._appPath
            });
        }
    });
    devPkgs.forEach(function (dep) {
        if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
            console.log('Installing package ' + dep + '...');
            cp.execSync('npm install ' + dep, {
                cwd: g3Config._appPath
            });
        }
    });
    return true;
}
exports.prepareG3 = prepareG3;
//# sourceMappingURL=prepareG3.js.map