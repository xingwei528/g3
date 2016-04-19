import * as models from './'

export class SourceDir {
  key: string
  config: models.ConfigJSON
  filenames: Array<string>
  dirnames: Array<string>
}
