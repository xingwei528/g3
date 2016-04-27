import * as path from 'path'
import * as fse from 'fs-extra'
import * as _ from 'lodash'
import * as yaml from 'js-yaml'

import * as models from '../../models'
import * as lib from '../'

export function readG3Config(appPath: string): models.G3Config {
  let config = null
  try {
    const ymlpath = path.join(appPath, models.Const.FILE_G3_YML)
    if (lib.isFile(ymlpath)) {
      config = yaml.safeLoad(fse.readFileSync(ymlpath, 'utf8'))
    }
  } catch (e) {
    console.log(e);
  }
  return config || new models.G3Config()
}

export function readDirConfig(dirPath: string, filenames: Array<string>): models.DirConfig {
  let config = null
  try {
    const ymlpath = path.join(dirPath, models.Const.FILE_CONFIG_YML)
    if (filenames.indexOf(models.Const.FILE_CONFIG_YML) != -1) {
      config = yaml.safeLoad(fse.readFileSync(ymlpath, 'utf8'))
    }
  } catch (e) {
    console.log(e);
  }
  return config || new models.DirConfig()
}
