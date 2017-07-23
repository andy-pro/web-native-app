# Web Native App

The project demonstrates the possibility of maximum sharing of code between web and the React Native platforms. In fact, only `src/browser/Root.js` and `src/native/Root.js` differ, well, also, the code for some components and styles is different.

## Try running it
* [Online demo](https://andy-pro.github.io/web-native-app)
* Download [WebNativeApp.apk](https://github.com/andy-pro/web-native-app/raw/master/WebNativeApp.apk)

The boilerplate is based on:

* [Create React App](https://github.com/facebookincubator/create-react-app)
* [React Native](https://github.com/facebook/react-native)
* [Este](https://github.com/este/este)

The stylization of the web components - [Fela](https://github.com/rofrischmann/fela). This approach allowed us to apply StyleSheets of the same structure.


Icons are implemented as SVG-components, for React Native apps - [react-native-svg](https://github.com/react-native-community/react-native-svg). The glyphs are taken from the project [react-icons](https://github.com/gorangajic/react-icons). A convenient tool for searching for the necessary icons - [Icon Viewer](https://andy-pro.github.io/icon-viewer).


### Browser Tasks

- `yarn run browser` run web app in development mode
- `yarn run build` build web app for production
- `yarn run deploy` deploy to Github pages (configure `git remote` before this)

### React Native Tasks

- `yarn run android` install React Native Android application
- `yarn run native` start React Native application
- `yarn run apk` generating the release APK
- `yarn run log` starting the Android logger

### Projects

Projects built using this boilerplate:
* [Icon Viewer](https://github.com/andy-pro/icon-viewer)
* [myLocations](https://github.com/andy-pro/myLocations)