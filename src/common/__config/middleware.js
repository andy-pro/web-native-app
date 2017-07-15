import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import configureDeps from './deps';
import configureEpics from './epics';

// Like redux-thunk, but with just one argument.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function' ? action({ ...deps, dispatch, getState }) : action);

const configureMiddleware = (initialState, platformDeps, platformMiddleware) => {
  const deps = configureDeps(initialState, platformDeps);
  const rootEpic = configureEpics(deps);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middleware = [injectMiddleware(deps), epicMiddleware, ...platformMiddleware];

  const { isBrowser } = initialState.app,
    enableLogger = process.env.NODE_ENV === 'development' && isBrowser;
  //&& (process.env.IS_BROWSER || initialState.device.isReactNative);

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
    });
    middleware.push(logger);
  }

  if (module.hot && typeof module.hot.accept === 'function') {
    let __epics = () => {
      const configureEpics = require('./epics').default;
      epicMiddleware.replaceEpic(configureEpics(deps));
    };
    if (isBrowser) {
      module.hot.accept('./epics', __epics);
    } else {
      module.hot.accept(__epics);
    }
  }
  /*
  */

  return middleware;
};

export default configureMiddleware;
