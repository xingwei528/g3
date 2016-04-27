import * as chai from 'chai'

import HTMLtoJSX from './htmltojsx'

var expect = chai.expect

describe('jsx', function() {
  it('htmlToJSX.parse', function(done) {
    const htmlToJSX = new HTMLtoJSX({
      createClass: false
    }, ['nav'])

    const content = htmlToJSX.convert(`
      <div><nav /><div /></div>
      `)
    console.log(content)

    done()
  })
})
