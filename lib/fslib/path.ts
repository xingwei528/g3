import * as path from 'path'
import * as _ from 'lodash'

export function pathRelative(from: string, to: string): string {
  return '/' + _.trim(path.relative(from, to).toLowerCase().replace(/\\/g,'/'), '/')
}

export function pathParent(key: string): string {
  return pathJoin(key, '..')
}

export function pathJoin(...paths: string[]): string {
  return '/' + _.trim(path.join(...paths).toLowerCase().replace(/\\/g,'/'), '/')
}
