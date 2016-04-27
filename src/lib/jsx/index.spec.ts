import * as path from 'path'
import * as chai from 'chai'

import * as models from '../../models'
import * as lib from '../'

var expect = chai.expect

describe('jsx', function() {
  it('createReactComponent', function(done) {
    const jsx = lib.getJSXContnt('<div>cc</div>')

    console.log(jsx)

    done()
  })
})
