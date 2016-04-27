import * as models from './'

export class SourceDir {
  key: string
  path: string
  filenames: Array<string>
  dirnames: Array<string>

  config: models.DirConfig
}
