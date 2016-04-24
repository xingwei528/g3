"use strict";
var chai = require('chai');
var fslib = require('../');
var expect = chai.expect;
describe('parseDir', function () {
    it('parseDir', function (done) {
        var config = fslib.getConfig('./demo', 'run');
        var sourceDirs = [];
        fslib.parseDir(config, config.source, sourceDirs, true);
        console.log(sourceDirs.map(function (sd) {
            return sd.key;
        }));
        done();
    });
});
//# sourceMappingURL=parseDir.spec.js.map