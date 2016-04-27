import * as chai from 'chai'

import Parser from './parser'

var expect = chai.expect

describe('jsx', function() {
  it('parser.convert', function(done) {
    const parser = new Parser()
    const content = parser.convert(`
      <div></div>
      <div></div>
      `)
    console.log(content)

    done()
  })
})
