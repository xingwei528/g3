import * as path from 'path'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../models'
const copySync = require('./copySync')
const removeSync = require('./removeSync')
const isFile = require('./isFile')

function parse(src: string, dest: string) {
  copySync(src, dest)
  fse.walk(dest).on('readable', function () {
    var item
    while (item = this.read()) {
      const filepath = item.path
      if (isFile(filepath)) {
        let filename = path.basename(filepath)
        let dirname = path.dirname(filepath)
        if (filename === 'config.json') {
          const configJSON: models.ConfigJSON = JSON.parse(fse.readFileSync(filepath).toString())
          let configJS = ''
          configJS += 'module.exports = {'
          if (configJSON.path) {
            configJS += "path: '" + configJSON.path + "',"
          } else {
            configJS += "component: 'div',"
          }
          if (configJSON.template) {
            configJS += "getComponent(nextState, cb) {"
            configJS += "    require.ensure([], (require) => {"
            configJS += "        cb(null, require('" + configJSON.template + "'));"
            configJS += "    });"
            configJS += "},"
          }
          if (isFile(path.join(dirname, 'index.jsx'))) {
            configJS += "getIndexRoute(location, cb) {"
            configJS += "    cb(null, {"
            configJS += "        getComponent(nextState, cb) {"
            configJS += "            require.ensure([], (require) => {"
            configJS += "                cb(null, require('./index'));"
            configJS += "            });"
            configJS += "        }"
            configJS += "    });"
            configJS += "},"
          }
          if (configJSON.children && configJSON.children.length > 0) {
            configJS += "getChildRoutes(location, cb) {"
            configJS += "    require.ensure([], (require) => {"
            configJS += "        cb(null, ["
            configJS += configJSON.children.map((child: string) => {
              return "require('" + child + "/config')"
            }).join(',')
            configJS += "        ]);"
            configJS += "    });"
            configJS += "}"
          }
          configJS += '}'
          const jPath = filepath.substr(0, filepath.lastIndexOf('.')) + '.js'
          console.log(jPath)
          const ws = fse.createOutputStream(jPath)
          ws.write(configJS)
          removeSync(filepath)
        }
        // path.join(filepath, 'config.json')
        // if (isMarkdown(filepath)) {
        //   const content = fm(fse.readFileSync(filepath).toString())
        //   let filename = path.basename(filepath)
        //   filename = filename.substr(0, filename.lastIndexOf('.'))
        //   const obj = _.assign({}, content.attributes, {
        //     id: filename,
        //     body: marked.parse(content.body)
        //   })
        //   const dirPath = getDirPath(filepath)
        //   const jPath = filepath.substr(0, filepath.lastIndexOf('.')) + '.json'
        //   console.log(jPath)
        //   const ws = fse.createOutputStream(jPath)
        //   ws.write(JSON.stringify(obj))
        //   let arr = dirFiles[dirPath] || []
        //   arr.push(obj)
        //   dirFiles[dirPath] = arr
        // }
      }
    }
  })
}

export = parse
