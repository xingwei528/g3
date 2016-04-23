import * as path from 'path'
import * as chai from 'chai'

import * as fslib from '../'

var expect = chai.expect

describe('fslib.location', function() {
  it('readdirSync', function(done) {
    const pagePath = path.resolve('./src/fslib')
    const list = fslib.listSync(pagePath)
    chai.assert.isAtLeast(list.dirnames.length, 1, 'dirs');
    chai.assert.isAtLeast(list.filenames.length, 3, 'files');

    done()
  })
})
