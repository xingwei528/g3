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

export function readDirConfig(sourceDir: models.SourceDir) {
  try {
    const ymlpath = path.join(sourceDir.path, models.Const.FILE_CONFIG_YML)
    if (sourceDir.filenames.indexOf(models.Const.FILE_CONFIG_YML) != -1) {
      sourceDir.config = yaml.safeLoad(fse.readFileSync(ymlpath, 'utf8'))
    }
  } catch (e) {
    console.log(e);
  }

  if (!sourceDir.config) {
    sourceDir.config = new models.DirConfig()
  }

  if (sourceDir.config.path === undefined) {
    if (sourceDir.key === '/') {
      sourceDir.config.path = '/'
    } else {
      sourceDir.config.path = path.basename(sourceDir.path).toLowerCase()
    }
  }
  if (sourceDir.config.layout === undefined) {
    if (sourceDir.filenames.indexOf(models.Const.FILE_LAYOUT + '.jsx') !== -1 || sourceDir.filenames.indexOf(models.Const.FILE_LAYOUT + '.html') !== -1) {
      sourceDir.config.layout = './' + models.Const.FILE_LAYOUT + '.jsx'
    }
  }
  if (sourceDir.config.excludes === undefined) {
    if (sourceDir.dirnames.indexOf(models.Const.DIR_COMPONENTS) !== -1) {
      sourceDir.config.excludes = [models.Const.DIR_COMPONENTS]
    }
  }
}
