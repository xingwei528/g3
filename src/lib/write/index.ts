import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'

import * as models from '../../models'
import * as lib from '../'

export function write(p: string, chunk: any) {
  const ws = fse.createOutputStream(p)
  ws.write(chunk)
}

export function writeHTML(g3Config: models.G3Config, routePath: string, devServer: boolean) {
  if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1) return
  const filepath = path.join(g3Config.destination, routePath, "index.html")
  let scripts = `<script src="/assets/js/bundle.js?v=${g3Config._timeStamp}"></script>`
  if (devServer) {
    scripts = '<script src="/webpack-dev-server.js"></script><script src="/bundle.js"></script>'
  }
  let html = g3Config._indexContent.replace(`<div id="${models.Const.DOM_REACT_ROOT}"></div>`, `<div id="${models.Const.DOM_REACT_ROOT}"></div>${scripts}`)
  write(filepath, html)
}

export function writeDATA(g3Config: models.G3Config) {
  const dataPath = path.join(g3Config.destination, models.Const.DIR_DATA)
  if (!lib.isDirectory(dataPath)) return

  var dirFiles: {[index: string]: Array<Object>} = {}
  fse.walk(dataPath).on('readable', function () {
    var item
    while (item = this.read()) {
      const filepath = item.path
      const stats: fse.Stats = fse.lstatSync(filepath)
      if (stats.isFile()) {
        if (lib.isMarkdown(filepath)) {
          const content = lib.readMarkdown(filepath)
          let filename = path.basename(filepath)
          filename = filename.substr(0, filename.lastIndexOf('.'))
          const obj = _.assign({}, content.attributes, {
            id: filename,
            body: marked.parse(content.body)
          })
          const dirPath = path.dirname(filepath)
          const jPath = filepath.substr(0, filepath.lastIndexOf('.')) + '.json'
          write(jPath, JSON.stringify(obj))
          let arr = dirFiles[dirPath] || []
          arr.push(obj)
          dirFiles[dirPath] = arr
          lib.removeSync(filepath)

          // if (g3Config._command === 'build') {
          //   let routePath = path.relative(dataPath, filepath)
          //   routePath = routePath.substr(0, routePath.lastIndexOf('.'))
          //   writeHTML(g3Config, routePath)
          // }
        }
      }
    }
  }).on('end', function () {
    _.keys(dirFiles).forEach((dirPath: string) => {
      const arr = dirFiles[dirPath] || []
      write(path.join(dirPath, 'index.json'), JSON.stringify(arr))
    })
  })
}
