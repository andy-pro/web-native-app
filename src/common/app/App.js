import React from 'react';
import { connect } from 'react-redux';

import { appStart, appStop, appLayout, resetForm } from './actions';
import { View, withRouter } from '../components';

import Page from '../__components/Page';
import config from '../../common/config';
import { mainCSS } from '../styles';
import os from '../../common/os';

// Pages
import HomePage from '../home/HomePage';
import ListViewPage from '../lists/ListViewPage';
import FlatListPage from '../lists/FlatListPage';
import SectionListPage from '../lists/SectionListPage';
import LongPressPage from '../editedlist/LongPressPage';

class App extends React.Component {
  componentDidMount() {
    this.props.appStart();
    if (config.hardwareBackPress) {
      os.subscribe('hardwareBackPress', () => {
        if (this.props.command) {
          this.props.resetForm();
          return true;
        }
        return false;
      });
    }
    if (os.isBrowser) {
      os.subscribe('resize', this.props.appLayout);
    }
  }

  componentWillUnmount() {
    this.props.appStop();
  }

  shouldComponentUpdate(nextProps) {
    // console.log('nextProps', Object.keys(nextProps.location));
    // console.log('nextProps', nextProps.location.pathname);
    return (
      nextProps.layout !== this.props.layout ||
      nextProps.location.pathname !== this.props.location.pathname ||
      nextProps.dataReady !== this.props.dataReady
    );
  }

  render() {
    // console.log('%cApp render', 'color:blue;font-weight:bold', this.props);
    let { layout, dataReady } = this.props,
      props = { layout, dataReady };
    // if (os.isNative) {
    //   mainViewProps.onLayout = e => this.props.appLayout(e.nativeEvent.layout);
    // }
    // console.log('App render', layout);
    return (
      <View style={mainCSS.fullMain}>
        <Page path="/" exact component={HomePage} {...props} />
        <Page path="/listview" component={ListViewPage} {...props} />
        <Page path="/flatlist" component={FlatListPage} {...props} />
        <Page path="/sectionlist" component={SectionListPage} {...props} />
        <Page path="/longpress" component={LongPressPage} {...props} />
      </View>
    );
  }
}

export default withRouter(
  connect(
    ({ app }) => ({
      command: app.command,
      dataReady: app.dataReady,
      layout: app.layout,
    }),
    {
      appStart,
      appStop,
      appLayout,
      resetForm,
    }
  )(App)
);
