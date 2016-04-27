import * as models from './'

export class SourceDir {
  key: string
  filenames: Array<string>
  dirnames: Array<string>

  config: models.DirConfig
}
