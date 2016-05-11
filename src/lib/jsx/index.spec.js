"use strict";
var chai = require('chai');
var lib = require('../');
var expect = chai.expect;
describe('jsx', function () {
    it('getJSXContent', function (done) {
        var jsx = lib.getJSXContent('.html', "\n<div></div>\n<div></div>\n      ", ['nav']);
        done();
    });
});
//# sourceMappingURL=index.spec.js.map