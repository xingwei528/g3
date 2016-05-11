import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'

import * as models from '../../../models'
import * as lib from '../../'

export function parseSourceFiles(g3Config: models.G3Config): Array<models.SourceDir> {
  let sourceDirs: Array<models.SourceDir> = []
  if (!lib.isDirectory(g3Config._sourcePath)) return sourceDirs

  if (!lib.isDirectory(g3Config._g3Path)) {
    console.log('Parsing the source files for the first time, please be patient')
  }
  lib.copySync(g3Config._sourcePath, g3Config._g3Path)

  if (!lib.isFile(path.join(g3Config._g3Path, models.Const.FILE_APP) + '.jsx') && !lib.isFile(path.join(g3Config._g3Path, models.Const.FILE_APP) + '.html')) {
    lib.writeSync(path.join(g3Config._g3Path, models.Const.FILE_APP + '.jsx'), lib.getAppJSContent(g3Config))
  }

  lib.getSourceDirs(g3Config, g3Config._sourcePath, null, false, sourceDirs)

  sourceDirs.forEach((sourceDir: models.SourceDir) => {
    if (!sourceDir.isExclude) {
      const configPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS)
      const configContent = lib.getConfigJSContent(g3Config, sourceDir)
      lib.writeSync(configPath, configContent)
    }

    sourceDir.filenames.forEach((filename: string) => {
      const ext = path.extname(filename)
      if (ext === '.html' || ext === '.html' || ext === '.jsx') {
        const filePath = path.join(g3Config._g3Path, sourceDir.key, filename)
        const jsxPath = path.join(g3Config._g3Path, sourceDir.key, filename.substring(0, filename.lastIndexOf('.')) + '.jsx')
        const content = lib.readFileSync(filePath)
        const jsx = lib.getJSXContent(ext, content, sourceDir.components)
        lib.writeSync(jsxPath, jsx)
      }
    })
  })

  return sourceDirs
}
