import React from 'react';
import PropTypes from 'prop-types';
// import { Link as NavLink } from 'react-router-native';
// import { Text, Linking, TouchableOpacity } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native';

const TouchLink = ({ to, ...props }, { router }) =>
  // <TouchableOpacity onPress={() => router.history.push(to)} {...props} />;
  <TouchableHighlight onPress={() => router.history.push(to)} {...props} />;

TouchLink.contextTypes = {
  router: PropTypes.object,
};

export { TouchLink };
