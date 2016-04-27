import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'

export function pathRelative(from: string, to: string): string {
  return '/' + _.trim(path.relative(from, to).toLowerCase().replace(/\\/g,'/'), '/')
}

export function pathParent(key: string): string {
  return pathJoin(key, '..')
}

export function pathJoin(...paths: string[]): string {
  return '/' + _.trim(path.join(...paths).toLowerCase().replace(/\\/g,'/'), '/')
}

export function listSync(dirpath: string): {
  dirnames: Array<string>
  filenames: Array<string>
} {
  let dirnames: Array<string> = []
  let filenames: Array<string> = []

  const arr: string[] = fse.readdirSync(dirpath) || []
  arr.forEach((name: string) => {
    var p = path.join(dirpath, name)
    if (fse.statSync(p).isDirectory()){
        dirnames.push(name)
    } else {
        filenames.push(name)
    }
  })
  return {
    dirnames: dirnames,
    filenames: filenames
  }
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
