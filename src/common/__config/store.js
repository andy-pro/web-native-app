import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import configureMiddleware from './middleware';
import configureReducer from './reducer';
import configureStorage from './storage';
import config from '../config';

const configureStore = options => {
  const { initialState, platformDeps = {}, platformMiddleware = [] } = options;

  const reducer = configureReducer(initialState);

  const middleware = configureMiddleware(initialState, platformDeps, platformMiddleware);

  const store = createStore(
    reducer,
    undefined,
    // initialState,
    /* comment, if REHYDRATE from 'redux-peersist' used;
       in this case initialState merged with state in reducers (REHYDRATE actions) */
    compose(applyMiddleware(...middleware), autoRehydrate({ log: true }))
  );

  if (platformDeps.storageEngine) {
    persistStore(store, configureStorage(config.appName, platformDeps.storageEngine));
  }

  // Enable hot reloading for reducers.

  if (module.hot && typeof module.hot.accept === 'function') {
    let __reducer = () => {
      const configureReducer = require('./reducer').default;
      store.replaceReducer(configureReducer(initialState));
    };
    if (initialState.app.isBrowser) {
      // Webpack for some reason needs accept with the explicit path.
      module.hot.accept('./reducer', __reducer);
    } else {
      // React Native for some reason needs accept without the explicit path.
      // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
      module.hot.accept(__reducer);
    }
  }
  /*
  */

  return store;
};

export default configureStore;
