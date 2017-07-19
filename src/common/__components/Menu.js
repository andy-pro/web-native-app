import React from 'react';
// import { connect } from 'react-redux';

// import { appShowMenu } from '../app/actions';
import { View, ScrollView, Link } from '../components';
import { colors, mainCSS, menuCSS } from '../styles';
import os from '../os';

const Divider = () => <View style={mainCSS.divider} />;

export default ({ appShowMenu, style }) => {
  const MenuLink = ({ ...props }) => {
    if (!props.message) {
      let t = `links.${props.to.slice(1) || 'menu.home'}.title`;
      props.message = os.messages[t];
    }
    props.onPress = () => appShowMenu(false);
    props.underlayColor = colors.menuTouch;
    props.style = menuCSS.link;
    return <Link {...props} />;
  };

  return (
    <ScrollView automaticallyAdjustContentInsets={false} style={[menuCSS.root, style]}>
      <MenuLink exact to="/" />
      <MenuLink to="/demo" />
      <MenuLink to="/listview" />
      <MenuLink to="/flatlist" />
      <MenuLink to="/sectionlist" />
      <MenuLink to="/longpress" />
      <MenuLink to="/formwrapper" />
      <MenuLink to="/editedlist" />
      <MenuLink to="/backup" />
      <MenuLink to="/autosuggest" />
      <MenuLink to="/localdb" />
      <MenuLink to="/remotedb" />
      <MenuLink to="/localization" />
      <Divider />
      <MenuLink to="/about" />
    </ScrollView>
  );
};

// export default connect(null, { appShowMenu })(Menu);
