import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'
import * as fslib from '../'

export function getSourceDirs(config: models.Config, dirpath: string, sourceDirs: Array<models.SourceDir>, isRecursive: boolean) {
  const list = fslib.listSync(dirpath)
  const dirname = path.basename(dirpath).toLowerCase()

  const sourceDir = new models.SourceDir()
  sourceDir.key = fslib.pathRelative(config.source, dirpath)

  if (fslib.isFile(path.join(dirpath, models.Const.FILE_CONFIG_JSON))) {
    let configJSON: models.ConfigJSON = null
    try {
      configJSON = JSON.parse(fse.readFileSync(path.join(dirpath, models.Const.FILE_CONFIG_JSON)).toString())
    } catch (e) {
      console.log(e)
    }
    if (configJSON) {
      sourceDir.path = configJSON.path
      sourceDir.layout = configJSON.layout
      if (configJSON.includes) {
        sourceDir.includes = _.map(configJSON.includes, (include: string) => {
          return include
        })
      }
      if (configJSON.excludes) {
        sourceDir.excludes = _.map(configJSON.excludes, (exclude: string) => {
          return exclude
        })
      }
    }
  }

  if (sourceDir.path === undefined) {
    let parentSourceDir: models.SourceDir = null
    const pathParent = fslib.pathParent(sourceDir.key)
    parentSourceDir = _.find(sourceDirs, (s: models.SourceDir) => {
      return s.key === pathParent;
    });

    if (parentSourceDir) {
      sourceDir.path = fslib.pathJoin(parentSourceDir.path, dirname)
    } else {
      sourceDir.path = sourceDir.key
    }
  }

  sourceDir.filenames = list.filenames
  sourceDir.dirnames = list.dirnames

  if (sourceDir.layout === undefined
    && (list.filenames.indexOf(models.Const.FILE_LAYOUT + '.jsx') !== -1
      || list.filenames.indexOf(models.Const.FILE_LAYOUT + '.html') !== -1)
  ) {
    sourceDir.layout = './' + models.Const.FILE_LAYOUT + '.jsx'
  }
  if (sourceDir.excludes === undefined && list.dirnames.indexOf(models.Const.DIR_COMPONENTS) !== -1) {
    sourceDir.excludes = [models.Const.DIR_COMPONENTS]
  }

  sourceDirs.push(sourceDir)

  if (isRecursive && list.dirnames && list.dirnames.length > 0) {
    list.dirnames.forEach((dirname: string) => {
      if (sourceDir.includes && sourceDir.includes.indexOf(dirname.toLowerCase()) === -1) return
      if (sourceDir.excludes && sourceDir.excludes.indexOf(dirname.toLowerCase()) !== -1) return
      const childpath = path.join(dirpath, dirname)
      getSourceDirs(config, childpath, sourceDirs, isRecursive)
    })
  }
}
