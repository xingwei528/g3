"use strict";
class Search {
    constructor(request) {
        this.request = request;
    }
    apps(query, tag, sort, order, cb) {
        this.request.get('/search/apps', {
            query: query,
            tag: tag,
            sort: sort,
            order: order
        }, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Search;
//# sourceMappingURL=search.js.map