import React from 'react';
import { connect } from 'react-redux';

import { appStart, appStop, appShowMenu, appLayout, resetForm } from './actions';
import { Drawer, Notify, withRouter } from '../components';

import Page from '../__components/Page';
import config from '../../common/config';
import { mainCSS } from '../styles';
import os from '../../common/os';

// Pages
import HomePage from '../home/HomePage';
import DemoPage from '../demo/DemoPage';
import ListViewPage from '../lists/ListViewPage';
import FlatListPage from '../lists/FlatListPage';
import SectionListPage from '../lists/SectionListPage';
import LongPressPage from '../lists/LongPressPage';
import WrappedFormPage from '../wrappedform/WrappedFormPage';
import EditedListPage from '../editedlist/EditedListPage';
import PopupDemoPage from '../autosuggest/PopupDemoPage';
import BackupPage from '../backup/BackupPage';
import AjaxDemoPage from '../ajax/AjaxDemoPage';

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
    if (nextProps.notify !== this.props.notify) {
      Notify(nextProps.notify);
      return false;
    }
    return (
      nextProps.layout !== this.props.layout ||
      nextProps.location.pathname !== this.props.location.pathname ||
      nextProps.dataReady !== this.props.dataReady
    );
  }

  render() {
    // console.log('%cApp render', 'color:blue;font-weight:bold', this.props);
    let { menuShown, appShowMenu, layout, dataReady } = this.props,
      props = { layout, dataReady };
    // if (os.isNative) {
    //   mainViewProps.onLayout = e => this.props.appLayout(e.nativeEvent.layout);
    // }
    // console.log('App render', layout);
    return (
      <Drawer style={mainCSS.fullMain} open={menuShown} trigger={appShowMenu}>
        <Page path="/" exact component={HomePage} {...props} />
        <Page path="/demo" component={DemoPage} {...props} />
        <Page path="/listview" component={ListViewPage} {...props} />
        <Page path="/flatlist" component={FlatListPage} {...props} />
        <Page path="/sectionlist" component={SectionListPage} {...props} />
        <Page path="/longpress/:location?" component={LongPressPage} {...props} />
        <Page path="/formwrapper" component={WrappedFormPage} {...props} />
        <Page path="/editedlist/:location?" component={EditedListPage} {...props} />
        <Page path="/autosuggest" component={PopupDemoPage} {...props} />
        <Page path="/backup" component={BackupPage} {...props} />
        <Page path="/fetch" component={AjaxDemoPage} {...props} />
      </Drawer>
    );
  }
}

export default withRouter(
  connect(
    ({ app }) => ({
      menuShown: app.menuShown,
      notify: app.notify,
      command: app.command,
      dataReady: app.dataReady,
      layout: app.layout,
    }),
    {
      appStart,
      appStop,
      appShowMenu,
      appLayout,
      resetForm,
    }
  )(App)
);
