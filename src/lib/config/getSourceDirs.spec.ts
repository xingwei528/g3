import * as path from 'path'
import * as chai from 'chai'

import * as models from '../../models'
import * as lib from '../'

var expect = chai.expect

// describe('config', function() {
//   it('getSourceDirs', function(done) {
//     const config: models.Config = lib.getConfig('./demo', 'run')
//     let sourceDirs: Array<models.SourceDir> = []
//     lib.getSourceDirs(config, config.source, sourceDirs, true)
//
//     console.log(sourceDirs.map((sd: models.SourceDir) => {
//       return sd.key
//     }))
//
//     done()
//   })
// })
