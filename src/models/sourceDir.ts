import * as models from './'

export class SourceDir {
  key: string
  filenames: Array<string>
  dirnames: Array<string>

  path: string
  layout: string
  includes: Array<string>
  excludes: Array<string>
}
