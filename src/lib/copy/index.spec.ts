import * as path from 'path'
import * as chai from 'chai'

import * as lib from '../'

var expect = chai.expect

describe('pages/{id}/actions', function() {
  it('publish', function(done) {
    const pagePath = path.resolve('./', 'package.json')
    const result = lib.readFileSync(pagePath)

    done()
  })
})
