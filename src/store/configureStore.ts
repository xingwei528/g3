import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState = {}) {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    return createStore(rootReducer, initialState);
  }

  let store;
  if (window['devToolsExtension']) { //Enable Redux devtools if the extension is installed in developer's browser
    store = window['devToolsExtension']()(createStore)(rootReducer, initialState);
  } else {
    store = createStore(rootReducer, initialState);
  }

  if (module['hot']) {
    // Enable Webpack hot module replacement for reducers
    module['hot'].accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
