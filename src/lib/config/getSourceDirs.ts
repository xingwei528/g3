import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'
import * as lib from '../'

export function getSourceDirs(g3Config: models.G3Config, dirPath: string, sourceDirs: Array<models.SourceDir>, isRecursive: boolean) {
  const list = lib.listSync(dirPath)

  const sourceDir = new models.SourceDir()
  sourceDir.key = lib.pathRelative(g3Config.source, dirPath)
  sourceDir.path = dirPath
  sourceDir.filenames = list.filenames
  sourceDir.dirnames = list.dirnames
  lib.readDirConfig(sourceDir)

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
