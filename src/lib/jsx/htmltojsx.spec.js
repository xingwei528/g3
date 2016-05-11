"use strict";
var chai = require('chai');
var htmltojsx_1 = require('./htmltojsx');
var expect = chai.expect;
describe('jsx', function () {
    it('htmlToJSX.parse', function (done) {
        var htmlToJSX = new htmltojsx_1.default({
            createClass: false
        }, ['Link']);
        var content = htmlToJSX.convert("\n      <Link to=\"/about\" activeClassName=\"active\"><i class=\"icon about\"></i> \u5173\u4E8E\u6211\u4EEC</Link>\n      ");
        console.log(content);
        done();
    });
});
//# sourceMappingURL=htmltojsx.spec.js.map