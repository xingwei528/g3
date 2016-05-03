import * as chai from 'chai'

import Parser from './parser'

var expect = chai.expect

describe('jsx', function() {
  it('parser.convert', function(done) {
    const parser = new Parser()
    const content = parser.convert(`
      <div><a data-to="/">cc
        <a data-to="/">ss</a>
      </a></div>
      `)

    done()
  })
})
