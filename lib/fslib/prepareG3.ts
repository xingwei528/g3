import * as path from 'path'
import * as fse from 'fs-extra'
import * as _ from 'lodash'
import * as cp from 'child_process'

import * as models from '../models'
import * as fslib from './'

export function prepareG3(config: models.Config): boolean {
  const packagePath = path.join(config._appPath, 'package.json')
  const gitignorePath = path.join(config._appPath, '.gitignore')
  if (!fslib.isFile(gitignorePath)) {
    let text = 'node_modules/\n'
    text += '.g3/\n'
    text += 'public/'
    const ws = fse.createOutputStream(gitignorePath)
    ws.write(text)
  }
  if (!fslib.isFile(packagePath)) {
    const g3Pkg = fse.readJsonSync(path.join(fslib.getPrefix(), 'node_modules', 'g3', 'package.json'))
    fslib.write(packagePath, JSON.stringify(_.assign({}, {
      dependencies: g3Pkg.dependencies
    })))
  }
  const pkg = fse.readJsonSync(packagePath)
  _.keysIn(pkg.dependencies).forEach((dep: string) => {
    if (!fslib.isDirectory(path.join(config._appPath, 'node_modules', dep))) {
      console.log('installing npm package ' + dep + '...')
      cp.execSync('npm install ' + dep)
    }
  })

  return true
}
