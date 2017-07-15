import React from 'react';
import { NavLink } from 'react-router-dom';

// import { View, Text, TouchableOpacity, TouchableHighlight } from '../fela';
import { View, Text, TouchableOpacity } from './fela';
import Icon from '../../common/__components/Icon';
import { mainCSS, iconColors } from '../styles';
import os from '../../common/os';

export { Icon };

const IconButtonBase = ({ message, children, size, color = iconColors.main, name }) => {
  size = size || os.isTouchDevice ? 16 : 15;
  message = message || children;
  return (
    <View style={mainCSS.centerRow}>
      <Icon size={size * 1.7} color={color} name={name} />
      {message &&
        <Text
          style={{
            fontSize: size,
            color,
            fontWeight: '600',
            paddingHorizontal: 3,
          }}
        >
          {message}
        </Text>}
    </View>
  );
};

export const IconButton = ({
  title,
  style,
  backgroundColor = iconColors.bgMain,
  onPress,
  ...props
}) =>
  <TouchableOpacity
    style={[
      mainCSS.button,
      { opacity: '0.8', backgroundColor, borderColor: backgroundColor },
      style,
    ]}
    onPress={onPress}
    activeOpacity={1}
    title={title}
  >
    <IconButtonBase {...props} />
  </TouchableOpacity>;

export const IconLink = ({ to, ...props }) =>
  <NavLink
    style={mainCSS.a_link}
    activeStyle={{ color: iconColors.main, textDecoration: 'underline' }}
    to={to}
  >
    <IconButtonBase {...props} />
  </NavLink>;
