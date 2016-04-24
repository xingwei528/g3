import * as path from 'path'
import * as chai from 'chai'

import * as models from '../../models'
import * as fslib from '../'

var expect = chai.expect

describe('parseDir', function() {
  it('parseDir', function(done) {
    const config: models.Config = fslib.getConfig('./demo', 'run')
    let sourceDirs: Array<models.SourceDir> = []
    fslib.parseDir(config, config.source, sourceDirs, true)

    console.log(sourceDirs.map((sd: models.SourceDir) => {
      return sd.key
    }))
    //

    done()
  })
})
