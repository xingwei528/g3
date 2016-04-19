import * as path from 'path'
import * as fse from 'fs-extra'
import * as marked from 'marked'
import * as _ from 'lodash'
var fm = require('front-matter')

import * as models from '../models'
import {isMarkdown} from './isMarkdown'
import {removeSync} from './removeSync'
import {writeHTML} from './writeHTML'

export function writeDATA(config: models.Config) {
  var dirFiles: {[index: string]: Array<Object>} = {}
  const dataPath = path.join(config.destination, 'data')
  fse.walk(dataPath).on('readable', function () {
    var item
    while (item = this.read()) {
      const filepath = item.path
      const stats: fse.Stats = fse.lstatSync(filepath)
      if (stats.isFile()) {
        if (isMarkdown(filepath)) {
          const content = fm(fse.readFileSync(filepath).toString())
          let filename = path.basename(filepath)
          filename = filename.substr(0, filename.lastIndexOf('.'))
          const obj = _.assign({}, content.attributes, {
            id: filename,
            body: marked.parse(content.body)
          })
          const dirPath = path.dirname(filepath)
          const jPath = filepath.substr(0, filepath.lastIndexOf('.')) + '.json'
          const ws = fse.createOutputStream(jPath)
          ws.write(JSON.stringify(obj))
          let arr = dirFiles[dirPath] || []
          arr.push(obj)
          dirFiles[dirPath] = arr
          removeSync(filepath)

          let routePath = path.relative(dataPath, filepath)
          routePath = routePath.substr(0, routePath.lastIndexOf('.'))
          writeHTML(config, routePath, '')
        }
      }
    }
  }).on('end', function () {
    _.keys(dirFiles).forEach((dirPath: string) => {
      const arr = dirFiles[dirPath] || []
      const ws = fse.createOutputStream(path.join(dirPath, 'index.json'))
      ws.write(JSON.stringify(arr))
    })
  })
}
