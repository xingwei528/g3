import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'
import * as fslib from '../'

export function pathRelative(from: string, to: string): string {
  return '/' + _.trim(path.relative(from, to).toLowerCase().replace(/\\/g,'/'), '/')
}

export function pathParent(key: string): string {
  return pathJoin(key, '..')
}

export function pathJoin(...paths: string[]): string {
  return '/' + _.trim(path.join(...paths).toLowerCase().replace(/\\/g,'/'), '/')
}

export function readdirSync(dirpath: string): string[] {
  return fse.readdirSync(dirpath)
}

export function getPrefix(): string {
  var prefix;

  if (process && process.platform === 'win32') {
    // c:\node\node.exe --> prefix=c:\node\
    prefix = process.env.APPDATA
      ? path.join(process.env.APPDATA, 'npm')
      : path.dirname(process.execPath);
  } else {
    // /usr/local/bin/node --> prefix=/usr/local
    prefix = path.dirname(path.dirname(process.execPath));

    // destdir only is respected on Unix
    if (process.env.DESTDIR) {
      prefix = path.join(process.env.DESTDIR, prefix);
    }
  }

  return prefix
}
