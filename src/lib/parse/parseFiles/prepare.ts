import * as path from 'path'
import * as fse from 'fs-extra'
import * as _ from 'lodash'
import * as cp from 'child_process'

import * as models from '../../../models'
import * as lib from '../../'

export function prepare(g3Config: models.G3Config) {
  const gitignorePath = path.join(g3Config._appPath, '.gitignore')
  if (!lib.isFile(gitignorePath)) {
    let text = 'node_modules/\n'
    text += '.g3/\n'
    text += 'public/'
    lib.writeSync(gitignorePath, text)
  }

  const pkgs = [
    "react",
    "react-dom",
    "react-router"
  ]
  const devPkgs = [
    "babel",
    "babel-core",
    "babel-loader",
    "babel-preset-es2015",
    "babel-preset-react",
    "babel-preset-stage-0",
    "style-loader",
    "css-loader",
    "file-loader"
  ]

  pkgs.forEach((dep: string) => {
    if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
      console.log('Installing package ' + dep + '...')
      cp.execSync('npm install ' + dep, {
        cwd: g3Config._appPath
      })
    }
  })

  devPkgs.forEach((dep: string) => {
    if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
      console.log('Installing package ' + dep + '...')
      cp.execSync('npm install ' + dep, {
        cwd: g3Config._appPath
      })
    }
  })
}
