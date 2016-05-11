import * as chai from 'chai'

import HTMLtoJSX from './htmltojsx'

var expect = chai.expect

describe('jsx', function() {
  it('htmlToJSX.parse', function(done) {
    const htmlToJSX = new HTMLtoJSX({
      createClass: false
    }, ['Link'])

    const content = htmlToJSX.convert(`
      <Link to="/about" activeClassName="active"><i class="icon about"></i> 关于我们</Link>
      `)

      console.log(content)

    done()
  })
})
