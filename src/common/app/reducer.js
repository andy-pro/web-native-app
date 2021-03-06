// import __initialState from '../initialState';
// import { REHYDRATE } from 'redux-persist/constants';
import { IMPORTED } from '../__backup/constants';
import os from '../os';

const initialState = {
  currentTheme: 'defaultTheme',
  error: null,
  notify: null,
  menuShown: false,
  online: false,
  started: false,
  dataReady: false,
  listName: '',
  entry: null,
  command: null,

  currentLocale: null,
  defaultLocale: null,
  locales: null,
  messages: null,
  layout: {},
  sortMode: { index: 1, name: 'asc' },
  importedData: null,
};

const sortModes = ['alpha', 'asc', 'desc'];

const setLocale = (state, locale) => {
  // state.messages.setLanguage(locale);
  return { ...state, currentLocale: locale };
};

const reducer = (state = initialState, action) => {
  // Because it's called from the server/frontend/createInitialState.
  if (!action) return state;

  let { type, payload, opts } = action;

  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  // TODO: Refactor it. We don't want sticky strings.
  if (type.endsWith('_FAIL')) {
    state = { ...state, error: payload.error };
  }

  if (opts && opts.notify) {
    state = { ...state, notify: opts.notify };
  }

  switch (type) {
    case 'APP_ERROR':
      // TODO: error notifier
      return { ...state, error: payload.error };

    case 'APP_SHOW_MENU':
      if (payload === undefined) {
        payload = !state.menuShown;
      }
      return { ...state, menuShown: payload };

    case 'APP_ONLINE':
      return { ...state, online: payload.online };

    case 'APP_START':
      return { ...state, started: true };

    case 'APP_LAYOUT':
      let { width, height } = payload,
        aspectRatio = width / height,
        layout = {
          isLandscape: width > height,
          width,
          height,
          aspectRatio,
        };
      if (os.isBrowser || (aspectRatio && aspectRatio !== state.layout.aspectRatio)) {
        return { ...state, layout };
      }
      return state;

    case 'SET_SORT_MODE':
      let name = sortModes[payload];
      return { ...state, sortMode: { index: payload, name } };

    case 'SET_COMMAND':
      return { ...state, command: payload };

    case 'RESET_FORM':
      return { ...state, command: null };

    case 'SET_ENTRY':
      let { listName, entry } = payload;
      if (listName === 'map' && state.command && state.command.name === 'pre_update') {
        entry = Object.assign({}, state.entry, entry);
      }
      return { ...state, listName, entry };

    case 'RESET_ENTRY':
      return {
        ...state,
        listName: '',
        entry: null,
        command: null,
      };

    case 'LIST_UPDATE':
      if (action.cmd === 'remove') {
        state = { ...state, entry: null };
        if (state.command && state.command.name === 'pre_update') state.command = null;
      }
      return state;

    case IMPORTED:
      return { ...state, importedData: payload };

    // this is the care of the autoRehydrate({stateReconciler})
    // process all the keys listed in 'config/storage.path
    // case REHYDRATE:
    //   let app = payload.app || __initialState.app;
    //   return Object.assign({}, state, app, { dataReady: true });

    case 'SET_LOCALE':
      return setLocale(state, payload);

    default:
      return state;
  }
};

export default reducer;
