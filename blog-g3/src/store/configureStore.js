"use strict";
const redux_1 = require('redux');
const reducers_1 = require('../reducers');
function configureStore(initialState = {}) {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
        return redux_1.createStore(reducers_1.default, initialState);
    }
    let store;
    if (window['devToolsExtension']) {
        store = window['devToolsExtension']()(redux_1.createStore)(reducers_1.default, initialState);
    }
    else {
        store = redux_1.createStore(reducers_1.default, initialState);
    }
    if (module['hot']) {
        module['hot'].accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
//# sourceMappingURL=configureStore.js.map