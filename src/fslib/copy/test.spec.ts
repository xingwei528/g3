import * as path from 'path'
import * as chai from 'chai'

import * as fslib from '../'

var expect = chai.expect

describe('pages/{id}/actions', function() {
  it('publish', function(done) {
    const pagePath = path.resolve('./', 'package.json')
    const result = fslib.readFileSync(pagePath)

    done()
  })
})
