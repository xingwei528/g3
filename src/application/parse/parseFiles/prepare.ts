import * as path from 'path'
import * as fse from 'fs-extra'
import * as _ from 'lodash'
import * as cp from 'child_process'

import * as models from '../../../models'
import * as lib from '../../../lib'
var pkg = require('../../package.json')

export function prepare(g3Config: models.G3Config) {
  const gitignorePath = path.join(g3Config._appPath, '.gitignore')
  if (!lib.isFile(gitignorePath)) {
    lib.writeSync(gitignorePath, `node_modules/
.g3/
public/`)
  }

  const packagePath = path.join(g3Config._appPath, 'package.json')
  if (!lib.isFile(packagePath)) {
    lib.writeSync(packagePath, JSON.stringify(pkg))
  }

  const pkgs = pkg.dependencies
  _.keys(pkg.dependencies).forEach((dep: string) => {
    if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
      console.log('Installing package ' + dep + '...')
      cp.execSync('npm install ' + dep, {
        cwd: g3Config._appPath
      })
    }
  })
}
