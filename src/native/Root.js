import React from 'react';
import { NativeRouter } from 'react-router-native';
import { Provider as Redux } from 'react-redux';
import { AppRegistry, AsyncStorage, Platform } from 'react-native';
import LocalizedStrings from 'react-native-localization';

import setupHardwareBackPress from './components/setupHardwareBackPress';
import configureStore from '../common/__config/store';
import config from '../common/config';
import initialState from '../common/initialState';
import App from '../common/app/App';
import os from '../common/os';

const messages = new LocalizedStrings(require('../common/__messages'));

/* platform dependencies */
initialState.app.isNative = true;
setupHardwareBackPress(os);
os.isNative = true;
os.messages = messages;
// os.platform = Platform.OS;
os.isIos = Platform.OS === 'ios';
os.isAndroid = Platform.OS === 'android';
/* platform dependencies */

const getDefaultDeviceLocale = () => {
  const { defaultLocale, locales } = initialState.app;
  // const deviceLocale = ReactNativeI18n.locale.split('-')[0];
  const deviceLocale = 'en';
  // console.log('dev loc', deviceLocale); // 'en'
  const isSupported = locales.indexOf(deviceLocale) !== -1;
  return isSupported ? deviceLocale : defaultLocale;
};

initialState.app.currentLocale = getDefaultDeviceLocale();

const store = configureStore({
  initialState,
  platformDeps: {
    config,
    storageEngine: AsyncStorage,
    messages,
  },
});

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {
  render() {
    return (
      <Redux store={store}>
        <NativeRouter>
          <App />
        </NativeRouter>
      </Redux>
    );
  }
}

AppRegistry.registerComponent(config.appName, () => Root);
