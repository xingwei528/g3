import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'
import * as lib from '../../lib'

export function getRoutePath(sourceDir: models.SourceDir): string {
  if (sourceDir.parent) {
    return lib.urlJoin(getRoutePath(sourceDir.parent), sourceDir.config.path)
  }
  return sourceDir.config.path
}

export function getSourceDirs(g3Config: models.G3Config, dirPath: string, parent: models.SourceDir, isExclude: boolean, sourceDirs: Array<models.SourceDir>) {
  const list = lib.listSync(dirPath)

  const sourceDir = new models.SourceDir()
  sourceDir.key = lib.pathRelative(g3Config._sourcePath, dirPath)
  sourceDir.path = dirPath
  sourceDir.filenames = list.filenames
  sourceDir.dirnames = list.dirnames
  sourceDir.components = lib.listComponentsSync(dirPath)
  sourceDir.parent = parent
  sourceDir.isExclude = isExclude
  lib.readDirConfig(sourceDir)

  sourceDirs.push(sourceDir)

  if (list.dirnames && list.dirnames.length > 0) {
    list.dirnames.forEach((dirname: string) => {
      let dirIsExclude = false
      if (sourceDir.config.includes && sourceDir.config.includes.indexOf(dirname.toLowerCase()) === -1) {
        dirIsExclude = true
      } else if (sourceDir.config.excludes && sourceDir.config.excludes.indexOf(dirname.toLowerCase()) !== -1) {
        dirIsExclude = true
      }
      const childpath = path.join(dirPath, dirname)
      getSourceDirs(g3Config, childpath, sourceDir, dirIsExclude, sourceDirs)
    })
  }
}
