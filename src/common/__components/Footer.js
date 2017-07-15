import React from 'react';
import { View, IconLink } from '../components';
import { mainCSS } from '../styles';

export default () =>
  <View style={[mainCSS.footer, mainCSS.centerRow]}>
    <IconLink to="/categories" message="Categories" name="go-list-unordered" />
    <IconLink to="/locations" message="Locations" name="go-globe" />
  </View>;
