import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'

import * as models from '../../models'
import * as lib from '../'

export function parse(g3Config: models.G3Config): Array<models.SourceDir> {
  let sourceDirs: Array<models.SourceDir> = []

  if (!lib.isDirectory(g3Config.source)) return sourceDirs
  if (!lib.prepareG3(g3Config)) return sourceDirs

  lib.copySync(g3Config.source, g3Config._g3Path)

  if (!lib.isFile(path.join(g3Config._g3Path, models.Const.FILE_APP) + '.jsx') && !lib.isFile(path.join(g3Config._g3Path, models.Const.FILE_APP) + '.html')) {
    let appJS = `import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import config from './config';
ReactDOM.render(
  <Router history={router.${g3Config.history}} routes={config}/>,
  document.getElementById('${models.Const.DOM_REACT_ROOT}')
);`

    lib.write(path.join(g3Config._g3Path, models.Const.FILE_APP + '.jsx'), appJS)
  }

  lib.getSourceDirs(g3Config, g3Config.source, null, sourceDirs)

  sourceDirs.forEach((sourceDir: models.SourceDir) => {
    const configPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS)
    const configContent = lib.getConfigJSContent(g3Config, sourceDir)
    lib.write(configPath, configContent)

    sourceDir.filenames.forEach((filename: string) => {
      if (path.extname(filename) === '.html') {
        const htmlPath = path.join(g3Config._g3Path, sourceDir.key, filename)
        const jsxPath = path.join(g3Config._g3Path, sourceDir.key, filename.substring(0, filename.lastIndexOf('.')) + '.jsx')
        const html = lib.readFileSync(htmlPath)
        const jsx = lib.getJSXContent(html, sourceDir.components)
        lib.write(jsxPath, jsx)
      }
    })
  })
  lib.writeDATA(g3Config)
  return sourceDirs
}
