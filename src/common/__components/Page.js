import React from 'react';
import { Route, Redirect, View } from '../components';
import Header from './Header';
import RoundToolBar from './RoundToolBar';
import { opts, mainCSS } from '../styles';
// import os from '../os';

const minH = 400;

export default ({ component: Component, path = '', exact, dataReady, layout }) => {
  // console.log('PAGE props', props);
  /* routerProps:
  {match: Object, location: Object, history: Object, staticContext: undefined,
    urlParts: Array (non-native, urlParts[0] - url root, urlParts[1] - root w/o slash)} */
  return (
    <Route
      exact={exact}
      path={path}
      render={routerProps => {
        /*  Single Page Apps for GitHub Pages
            https://github.com/rafrex/spa-github-pages
            Long live Single Page */
        let { search } = routerProps.location,
          qs = /^\?p=\/?(.+)/.exec(search);
        if (qs) {
          qs = '/' + qs[1];
          return <Redirect to={qs} />;
        } else {
          let urlParts = routerProps.match.url
            .split('/')
            .map((e, i, a) => (i ? e : '/' + a[1]));
          /* urlParts:
              [0] - root path ('/', '/categories', '/locations', '/map')
              [1, ...] root and params w/o slashes ([''], ['categories'], ['locations', ':category'], ...)
            */
          /* screen layout, width, position of the RoundButton */
          let root = urlParts[0],
            // isRoot = root === '/',
            isEdit = root === '/editedlist',
            height = layout.height || minH,
            land = layout.isLandscape && height < minH,
            sideMenuMode = layout.width > opts.maxWidth + opts.menuWidth,
            limitedCSS = sideMenuMode ? mainCSS.sideMenuLimited : mainCSS.limited;
          Object.assign(routerProps, {
            dataReady,
            layout,
            urlParts,
            land,
            sideMenuMode,
          });
          return (
            <View style={mainCSS.root}>
              <Header limitedCSS={limitedCSS} {...routerProps} />
              <View style={[mainCSS.fullArea, limitedCSS]}>
                <Component {...routerProps} />
                {isEdit &&
                  <View style={[mainCSS.fullWidth, !land && mainCSS.limited]}>
                    <RoundToolBar {...routerProps} />
                  </View>}
              </View>
            </View>
          );
        }
      }}
    />
  );
};

// {(isRoot || height >= minH) && <Footer />}
