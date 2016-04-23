"use strict";
var path = require('path');
var chai = require('chai');
var fslib = require('../');
var expect = chai.expect;
describe('pages/{id}/actions', function () {
    it('publish', function (done) {
        var pagePath = path.resolve('./', 'package.json');
        var result = fslib.readFileSync(pagePath);
        done();
    });
});
//# sourceMappingURL=index.spec.js.map