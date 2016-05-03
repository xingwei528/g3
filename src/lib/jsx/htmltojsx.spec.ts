import * as chai from 'chai'

import HTMLtoJSX from './htmltojsx'

var expect = chai.expect

describe('jsx', function() {
  it('htmlToJSX.parse', function(done) {
    const htmlToJSX = new HTMLtoJSX({
      createClass: false
    }, ['SUBNAV'])

    const content = htmlToJSX.convert(`
      <div id="homepage">
        <subNav />
        <section id="content_container"></section>
      </div>
      `)

      console.log(content)

    done()
  })
})
