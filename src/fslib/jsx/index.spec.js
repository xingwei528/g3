"use strict";
var chai = require('chai');
var fslib = require('../');
var expect = chai.expect;
describe('jsx', function () {
    it('createReactComponent', function (done) {
        var jsx = fslib.createReactComponent('<div>cc</div>');
        console.log(jsx);
        done();
    });
});
//# sourceMappingURL=index.spec.js.map