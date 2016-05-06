import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'

import * as models from '../../../models'
import * as lib from '../../'

export function parseDataFiles(g3Config: models.G3Config) {
  if (!lib.isDirectory(g3Config._dataPath)) return
  parseDir(g3Config, './')
}

function parseFile(g3Config: models.G3Config, relatedPath: string) {
  const filePath = path.join(g3Config._dataPath, relatedPath)
  let fileObj = null

  if (lib.isMarkdown(filePath)) {
    const content = lib.readMarkdown(filePath)
    let filename = path.basename(filePath)
    filename = filename.substr(0, filename.lastIndexOf('.'))
    fileObj = _.assign({}, content.attributes, {
      id: filename,
      body: marked.parse(content.body)
    })
    const dirPath = path.dirname(filePath)
    const jPath = path.join(g3Config._destinationPath, models.Const.DIR_DATA, relatedPath.substr(0, relatedPath.lastIndexOf('.')) + '.json')
    lib.writeSync(jPath, JSON.stringify(fileObj))

    // if (g3Config._command === 'build') {
    //   let routePath = path.relative(dataPath, filepath)
    //   routePath = routePath.substr(0, routePath.lastIndexOf('.'))
    //   writeHTML(g3Config, routePath)
    // }
  }

  return fileObj
}

function parseDir(g3Config: models.G3Config, relatedPath: string) {
  const dirPath = path.join(g3Config._dataPath, relatedPath)
  const list = lib.listSync(dirPath)
  if (list.filenames && list.filenames.length > 0) {
    let arr = []
    list.filenames.forEach((filename: string) => {
      const fileObj = parseFile(g3Config, path.join(relatedPath, filename))
      if (fileObj) {
        arr.push(fileObj)
      }
    })

    console.log(path.join(g3Config._destinationPath, models.Const.DIR_DATA, relatedPath, 'index.json'))
    lib.writeSync(path.join(g3Config._destinationPath, models.Const.DIR_DATA, relatedPath, 'index.json'), JSON.stringify(arr))
  }

  if (list.dirnames && list.dirnames.length > 0) {
    list.dirnames.forEach((dirname: string) => {
      parseDir(g3Config, path.join(relatedPath, dirname))
    })
  }
}
