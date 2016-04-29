"use strict";
var chai = require('chai');
var parser_1 = require('./parser');
var expect = chai.expect;
describe('jsx', function () {
    it('parser.convert', function (done) {
        var parser = new parser_1.default();
        var content = parser.convert("\n      <div><a data-to=\"/\">cc\n        <a data-to=\"/\">ss</a>\n      </a></div>\n      ");
        console.log(content);
        done();
    });
});
//# sourceMappingURL=parser.spec.js.map