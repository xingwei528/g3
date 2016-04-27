import * as fse from 'fs-extra'
var fm = require('front-matter')

export function readFileSync(filepath: string): string {
  return fse.readFileSync(filepath, 'utf-8')
}

export function readFile(filepath: string, callback: (error: Error, data: NodeBuffer) => void) {
  fse.readFile(filepath, callback)
}

export function readMarkdown(filepath: string): {
  body: string
  attributes: any
} {
  try{
    const content = fm(readFileSync(filepath).toString())
    return content
  } catch(e) {
    console.log('file: ' + filepath)
    console.log(e)
  }

  return {
    body: '',
    attributes: {}
  }
}
