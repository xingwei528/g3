"use strict";
class Files {
    constructor(request) {
        this.request = request;
    }
    delete(appPath, path, cb) {
        this.request.delete('/apps/' + appPath + '/files/' + path, null, cb);
    }
    edit(appPath, path, content, cb) {
        this.request.put('/apps/' + appPath + '/files/' + path, {
            content: content
        }, cb);
    }
    get(appPath, path, cb) {
        this.request.get('/apps/' + appPath + '/' + path, null, cb);
    }
    list(appPath, path, cb) {
        if (!path || path == "/" || path == "." || path == "./") {
            this.request.get('/apps/' + appPath + '/files', null, cb);
        }
        else {
            this.request.get('/apps/' + appPath + '/files/' + path, null, cb);
        }
    }
    getUploadUrl(appPath, location) {
        return this.request.getURL('/apps/' + appPath + '/files/actions/upload?location=' + location);
    }
    getDownloadUrl(appPath) {
        return this.request.getURL('/apps/' + appPath + '/files/actions/download');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Files;
//# sourceMappingURL=apps_files.js.map