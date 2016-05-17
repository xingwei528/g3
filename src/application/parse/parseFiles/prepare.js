"use strict";
var path = require('path');
var _ = require('lodash');
var cp = require('child_process');
var lib = require('../../../lib');
var pkg = require('../../package.json');
function prepare(g3Config) {
    var gitignorePath = path.join(g3Config._appPath, '.gitignore');
    if (!lib.isFile(gitignorePath)) {
        lib.writeSync(gitignorePath, "node_modules/\n.g3/\npublic/");
    }
    var packagePath = path.join(g3Config._appPath, 'package.json');
    if (!lib.isFile(packagePath)) {
        lib.writeSync(packagePath, JSON.stringify(pkg));
    }
    var pkgs = pkg.dependencies;
    _.keys(pkg.dependencies).forEach(function (dep) {
        if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
            console.log('Installing package ' + dep + '...');
            cp.execSync('npm install ' + dep, {
                cwd: g3Config._appPath
            });
        }
    });
}
exports.prepare = prepare;
//# sourceMappingURL=prepare.js.map