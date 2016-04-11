"use strict";
const apps_files_1 = require('./apps_files');
const apps_folders_1 = require('./apps_folders');
class Apps {
    constructor(request) {
        this.request = request;
        this.files = new apps_files_1.default(this.request);
        this.folders = new apps_folders_1.default(this.request);
    }
    add(dirPath, origin, check, cb) {
        this.request.post('/apps', {
            dirPath: dirPath,
            origin: origin,
            check: check,
        }, cb);
    }
    create(name, description, tags, origin, _private, cb) {
        this.request.post('/apps', {
            name: name,
            description: description,
            tags: tags,
            origin: origin,
            private: _private
        }, cb);
    }
    delete(appPath, keepFiles, cb) {
        this.request.delete('/apps/' + appPath, {
            keepFiles: keepFiles
        }, cb);
    }
    edit(appPath, data, cb) {
        this.request.patch('/apps/' + appPath, data, cb);
    }
    get(appPath, cb) {
        this.request.get('/apps/' + appPath, null, cb);
    }
    list(cb) {
        this.request.get('/apps', null, cb);
    }
    publish(appPath, cb) {
        this.request.post('/apps/' + appPath + '/actions/publish', null, cb);
    }
    star(appPath, star, cb) {
        this.request.post('/apps/' + appPath + '/actions/star', {
            star: star
        }, cb);
    }
    sync(appPath, cb) {
        this.request.post('/apps/' + appPath + '/actions/sync', null, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Apps;
//# sourceMappingURL=apps.js.map