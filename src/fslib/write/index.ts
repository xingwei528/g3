import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../../models'
import * as fslib from '../'

export function write(p: string, chunk: any) {
  const ws = fse.createOutputStream(p)
  ws.write(chunk)
}

export function writeHTML(config: models.Config, routePath: string, content: string) {
  if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1) return
  const filepath = path.join(config.destination, routePath, "index.html")
  const scripts = config._command === 'run' ? '<script src="/webpack-dev-server.js"></script><script src="/bundle.js"></script>' : '<script src="/assets/js/bundle.js"></script>'
  let html = config._indexContent.replace('<div id="react-root"></div>', '<div id="react-root">' + content + '</div>' + scripts)
  write(filepath, html)
}

export function writeDATA(config: models.Config) {
  const dataPath = path.join(config.destination, models.Const.DIR_DATA)
  if (!fslib.isDirectory(dataPath)) return

  var dirFiles: {[index: string]: Array<Object>} = {}
  fse.walk(dataPath).on('readable', function () {
    var item
    while (item = this.read()) {
      const filepath = item.path
      const stats: fse.Stats = fse.lstatSync(filepath)
      if (stats.isFile()) {
        if (fslib.isMarkdown(filepath)) {
          const content = fm(fse.readFileSync(filepath).toString())
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
          fslib.removeSync(filepath)

          let routePath = path.relative(dataPath, filepath)
          routePath = routePath.substr(0, routePath.lastIndexOf('.'))
          writeHTML(config, routePath, '')
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
