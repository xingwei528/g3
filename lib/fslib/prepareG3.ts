import * as path from 'path'
import * as fse from 'fs-extra'
import * as _ from 'lodash'

import * as models from '../models'
import {copySync} from './copySync'
import {isFile} from './isFile'
import {isDirectory} from './isDirectory'
import {getPrefix} from './getPrefix'

export function prepareG3(config: models.Config): boolean {
  const packagePath = path.join(config._appPath, 'package.json')
  const node_modulesPath = path.join(config._appPath, 'node_modules')
  const gitignorePath = path.join(config._appPath, '.gitignore')
  if (!isFile(gitignorePath)) {
    let text = 'node_modules/\n'
    text += '.g3/\n'
    text += 'public/'
    const ws = fse.createOutputStream(gitignorePath)
    ws.write(text)
  }
  if (!isFile(packagePath)) {
    const json = fse.readJsonSync(path.join(getPrefix(), 'node_modules', 'g3', 'package.json'))
    const ws = fse.createOutputStream(packagePath)
    ws.write(JSON.stringify(_.assign({}, {
      dependencies: json.dependencies
    })))
  }
  if (!isDirectory(node_modulesPath)) {
    console.log('please install package')
    return false
  }
  return true
}
