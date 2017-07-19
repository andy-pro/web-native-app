import React from 'react';
import { connect } from 'react-redux';

import { appShowMenu } from '../../common/app/actions';
import { View, Text, Helmet, DropdownMenu } from '../components';
import Menu from './Menu';
import ToolBar from './ToolBar';
import { headerCSS, sideCSS } from '../styles';
import os from '../../common/os';

const Header = props => {
  let { isBrowser, messages } = os,
    { urlParts, menuShown, appShowMenu, sideMenuMode, limitedCSS } = props,
    [root, name] = urlParts,
    title = messages[`links.${name || 'home'}.title`],
    styles = sideMenuMode ? sideCSS : headerCSS;
  return (
    <View style={styles.root}>
      <View style={[limitedCSS, styles.content]}>
        {isBrowser && <Helmet title={title} />}
        {isBrowser &&
          <DropdownMenu
            open={menuShown}
            content={<Menu style={styles.dropdown} appShowMenu={appShowMenu} />}
            onClose={() => appShowMenu(false)}
            sideMenuMode={sideMenuMode}
          />}
        <Text style={styles.title}>
          {title}
        </Text>
        <ToolBar {...props} />
      </View>
    </View>
  );
};

export default connect(({ app }) => ({ menuShown: app.menuShown }), {
  appShowMenu,
})(Header);
