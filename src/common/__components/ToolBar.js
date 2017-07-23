import React from 'react';
import { connect } from 'react-redux';

import { setCommand, setSortMode, appShowMenu } from '../app/actions';
// import { findNameByUrl } from '../__lib/find';
import { View, Text, IconButton } from '../components';
import { opts, mainCSS, colors, iconColors } from '../styles';
import os from '../os';

// const setHighlight = (icon, props) =>
//   icon.key === props.mapViewMode ? iconColors.main : iconColors.disabled;

// prettier-ignore
const icons = {
  home: { key: 'home', title: 'Home', name: 'md-home', to: '/' },
  menu: { key: 'menu', title: 'Menu', name: 'md-menu', act: 'toggleMenu' },
  back: { key: 'back', title: 'Back', name: 'md-arrow-back', act: 'goBack' },
  add: { key: 'add', title: 'Add', name: 'md-add-circle', cmd: 'pre_insert' },
  remove: { key: 'remove', title: 'Remove', name: 'md-remove-circle', cmd: 'remove', dis: true },
  edit: { key: 'edit', title: 'Edit', name: 'md-edit', cmd: 'pre_update', dis: true},
  map: { key: 'map', title: 'Map view', name: 'md-public' },
  sort0: { key: 'sort0', title: 'Sort by alpha', name: 'fa-sort-alpha-asc', act: 'nextSort' },
  sort1: { key: 'sort1', title: 'Sort ascendant', name: 'fa-sort-numeric-asc', act: 'nextSort' },
  sort2: { key: 'sort2', title: 'Sort descendant', name: 'fa-sort-numeric-desc', act: 'nextSort' },
};

const ToolBar = props => {
  let {
      history,
      urlParts,
      entry,
      sortMode,
      layout,
      // categories,
      // locations,
      setCommand,
      setSortMode,
      appShowMenu,
      sideMenuMode,
    } = props,
    path = urlParts[0],
    // _home = path === '/',
    _cats = path === '/categories',
    _locs = path === '/locations',
    _map = path === '/map',
    entryName = entry ? entry.name : '',
    notList = entry && !entryName,
    { isBrowser, isNative } = os,
    homeIcon = isBrowser ? 'home' : 'menu',
    subTitleCSS = { color: sideMenuMode ? colors.dark : colors.light };

  if (isNative) {
    let { width } = layout,
      max = opts.maxWidth;
    // 5 icons + gaps ~ 250px
    subTitleCSS.width = width && width > max ? max - 250 : 150;
    // console.log('layout', width, height);
  }

  const actions = {
    toggleMenu: () => appShowMenu(),
    goBack: () => history.goBack(),
    nextSort: icon => {
      var i = /^sort(\d+)/.exec(icon.key);
      i = +i[1] + 1;
      i %= 3; // 0, 1, 2, 0, 1, 2, ...
      setSortMode(i);
    },
  };

  const __cmd = icon => {
    if (icon.to) return history.push(icon.to);
    if (icon.act) return actions[icon.act](icon);
    setCommand({ name: icon.cmd || icon.key, path, entry });
  };

  const iconSet = key => {
    let icon = icons[key],
      dis = icon.dis && notList,
      { color } = icon;
    color = color
      ? typeof color === 'function' ? color(icon, props) : color
      : dis ? iconColors.disabled : iconColors.main;
    let set = {
      size: 21,
      color,
      name: icon.name,
      title: icon.title,
    };
    if (!dis) {
      set.onPress = () => __cmd(icon);
    }
    return set;
  };

  let _list = _cats || _locs,
    _edit = _list && entry,
    _menu = !sideMenuMode;
  return (
    <View style={mainCSS.between}>
      <View style={mainCSS.centerRow}>
        {_menu && <IconButton {...iconSet(homeIcon)} />}
        <Text style={[mainCSS.subTitle, subTitleCSS]}>
          {entryName}
        </Text>
      </View>

      <View style={mainCSS.centerRow}>
        {_menu && isBrowser && <IconButton {...iconSet('menu')} />}
        {_edit && <IconButton {...iconSet('add')} />}
        {_edit && <IconButton {...iconSet('remove')} />}
        {_edit && <IconButton {...iconSet('edit')} />}
        {_list && <IconButton {...iconSet('sort' + sortMode.index)} />}
      </View>
    </View>
  );
};

export default connect(
  ({ app }) => ({
    entry: app.entry,
    sortMode: app.sortMode,
    // mapViewMode: app.mapViewMode,
    // layout: app.layout,
    // categories,
    // locations,
  }),
  { setCommand, setSortMode, appShowMenu }
)(ToolBar);
