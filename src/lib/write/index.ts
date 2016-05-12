import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'

import * as models from '../../models'
import * as lib from '../'

export function writeSync(p: string, chunk: any) {
  fse.outputFileSync(p, chunk)
}

export function writeHTML(g3Config: models.G3Config, routePath: string, devServer: boolean) {
  if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1) return
  const rootFilepath = path.join(g3Config._appPath, routePath, "index.html")
  const filepath = path.join(g3Config._destinationPath, routePath, "index.html")
  const publicPath = _.trimEnd(g3Config.output.publicPath, '/')
  let scripts = `<script src="${publicPath}/${g3Config.output.filename}?v=${g3Config._timeStamp}"></script>`
  if (devServer) {
    scripts = '<script src="/webpack-dev-server.js"></script><script src="/bundle.js"></script>'
  }
  let content = g3Config._indexContent
  if (lib.isFile(rootFilepath)) {
    content = lib.readFileSync(rootFilepath)
  }
  let html = content.replace(`<div id="${models.Const.DOM_REACT_ROOT}"></div>`, `<div id="${models.Const.DOM_REACT_ROOT}"></div>${scripts}`)
  writeSync(filepath, html)
}
