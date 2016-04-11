"use strict";
class Folders {
    constructor(request) {
        this.request = request;
    }
    create(appPath, path, cb) {
        this.request.post('/apps/' + appPath + '/folders', {
            path: path
        }, cb);
    }
    delete(appPath, path, cb) {
        this.request.delete('/apps/' + appPath + '/folders', {
            path: path
        }, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Folders;
//# sourceMappingURL=apps_folders.js.map