import * as path from 'path'
import * as chai from 'chai'

import * as models from '../../models'
import * as lib from '../'

var expect = chai.expect

describe('jsx', function() {
  it('getJSXContent', function(done) {
    const jsx = lib.getJSXContent('.html', `
<div></div>
<div></div>
      `, ['nav'])

    done()
  })
})
