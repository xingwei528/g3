import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
var fm = require('front-matter')
import * as marked from 'marked'

export function copySync(src: string, dest: string) {
  try {
    fse.copySync(src, dest)
  } catch (err) {
    console.error(err)
  }
}

export function isMarkdown(filepath: string): boolean {
  if (_.endsWith(filepath, '.md')) {
    return true
  }
  return false
}

export function getDirPath(filepath: string): string {
  return path.dirname(filepath)
}

export function mdToJSON(src: string) {
  var dirFiles: {[index: string]: Array<Object>} = {}
  fse.walk(src).on('readable', function () {
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
          const dirPath = getDirPath(filepath)
          const jPath = filepath.substr(0, filepath.lastIndexOf('.')) + '.json'
          console.log(jPath)
          const ws = fse.createOutputStream(jPath)
          ws.write(JSON.stringify(obj))
          let arr = dirFiles[dirPath] || []
          arr.push(obj)
          dirFiles[dirPath] = arr
        }
      }
    }
  }).on('end', function () {
    _.keys(dirFiles).forEach((dirPath: string) => {
      const arr = dirFiles[dirPath] || []
      console.log(path.join(dirPath, 'index.json'))
      const ws = fse.createOutputStream(path.join(dirPath, 'index.json'))
      ws.write(JSON.stringify(arr))
    })
  })
}
