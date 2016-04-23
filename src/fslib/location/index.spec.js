"use strict";
var path = require('path');
var chai = require('chai');
var fslib = require('../');
var expect = chai.expect;
describe('fslib.location', function () {
    it('readdirSync', function (done) {
        var pagePath = path.resolve('./src/fslib');
        var list = fslib.listSync(pagePath);
        chai.assert.isAtLeast(list.dirnames.length, 1, 'dirs');
        chai.assert.isAtLeast(list.filenames.length, 3, 'files');
        done();
    });
});
//# sourceMappingURL=index.spec.js.map