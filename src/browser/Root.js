import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as Redux } from 'react-redux';
import { Provider as Fela } from 'react-fela';
import LocalizedStrings from 'react-localization';
import localforage from 'localforage';

import setupTouch from './components/setupTouch';
import subscribe from './components/subscribe';
import configureFela from './components/fela/config';
import configureStore from '../common/__config/store';
import config from '../common/config';
import initialState from '../common/initialState';
import App from '../common/app/App';
import os from '../common/os';

const messages = new LocalizedStrings(require('../common/__messages'));

/* platform dependencies */
initialState.app.isBrowser = true;
setupTouch(os);
subscribe(os);
os.isBrowser = true;
os.messages = messages;

/*
os.smoothScroll = smoothScroll;
function smoothScroll() {
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothScroll);
    window.scrollTo(0, currentScroll - currentScroll / 5);
  }
}
*/
/*
var start_time = performance.now()
process.__elapsed = (msg) => {
  console.info(msg, performance.now() - start_time)
  start_time = performance.now()
}*/
/* platform dependencies */

const store = configureStore({
  initialState,
  platformDeps: {
    config,
    messages,
    storageEngine: localforage,
  },
});

const styleNode = document.getElementById('stylesheet');
// basename = process.env.NODE_ENV !== 'production' ? '/' : '/web-native-app';

const Root = () =>
  <Redux store={store}>
    <Fela mountNode={styleNode} renderer={configureFela()}>
      <BrowserRouter basename="web-native-app">
        <App />
      </BrowserRouter>
    </Fela>
  </Redux>;

export default Root;
