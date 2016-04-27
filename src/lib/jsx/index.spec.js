"use strict";
var chai = require('chai');
var lib = require('../');
var expect = chai.expect;
describe('jsx', function () {
    it('createReactComponent', function (done) {
        var jsx = lib.getJSXContnt('<div>cc</div>');
        console.log(jsx);
        done();
    });
});
//# sourceMappingURL=index.spec.js.map