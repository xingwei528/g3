import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'
import * as lib from '../'

export function getSourceDirs(g3Config: models.G3Config, dirPath: string, sourceDirs: Array<models.SourceDir>, isRecursive: boolean) {
  const list = lib.listSync(dirPath)
  const dirname = path.basename(dirPath).toLowerCase()

  const sourceDir = new models.SourceDir()
  sourceDir.key = lib.pathRelative(g3Config.source, dirPath)
  sourceDir.filenames = list.filenames
  sourceDir.dirnames = list.dirnames
  sourceDir.config = lib.readDirConfig(dirPath, list.filenames)

  if (sourceDir.config.path === undefined) {
    let parentSourceDir: models.SourceDir = null
    const pathParent = lib.pathParent(sourceDir.key)
    parentSourceDir = _.find(sourceDirs, (s: models.SourceDir) => {
      return s.key === pathParent;
    });

    if (parentSourceDir) {
      sourceDir.config.path = lib.pathJoin(parentSourceDir.config.path, dirname)
    } else {
      sourceDir.config.path = sourceDir.key
    }
  }

  if (sourceDir.config.layout === undefined
    && (list.filenames.indexOf(models.Const.FILE_LAYOUT + '.jsx') !== -1
      || list.filenames.indexOf(models.Const.FILE_LAYOUT + '.html') !== -1)
  ) {
    sourceDir.config.layout = './' + models.Const.FILE_LAYOUT + '.jsx'
  }
  if (sourceDir.config.excludes === undefined && list.dirnames.indexOf(models.Const.DIR_COMPONENTS) !== -1) {
    sourceDir.config.excludes = [models.Const.DIR_COMPONENTS]
  }

  sourceDirs.push(sourceDir)

  if (isRecursive && list.dirnames && list.dirnames.length > 0) {
    list.dirnames.forEach((dirname: string) => {
      if (sourceDir.config.includes && sourceDir.config.includes.indexOf(dirname.toLowerCase()) === -1) return
      if (sourceDir.config.excludes && sourceDir.config.excludes.indexOf(dirname.toLowerCase()) !== -1) return
      const childpath = path.join(dirPath, dirname)
      getSourceDirs(g3Config, childpath, sourceDirs, isRecursive)
    })
  }
}
