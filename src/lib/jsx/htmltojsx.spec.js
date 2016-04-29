"use strict";
var chai = require('chai');
var htmltojsx_1 = require('./htmltojsx');
var expect = chai.expect;
describe('jsx', function () {
    it('htmlToJSX.parse', function (done) {
        var htmlToJSX = new htmltojsx_1.default({
            createClass: false
        }, ['children']);
        var content = htmlToJSX.convert("\n<div>\n  layout\n  <Children>ss</Children>\n</div>\n      ");
        console.log(content);
        done();
    });
});
//# sourceMappingURL=htmltojsx.spec.js.map