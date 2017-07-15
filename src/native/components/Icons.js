import React from 'react';
import { Link as NavLink } from 'react-router-native';

// import { Text, Linking, TouchableOpacity } from 'react-native';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
// import Icon from './IconBase';
import Icon from '../../common/__components/Icon';
import { mainCSS, iconColors } from '../styles';

export { Icon };

const IconButtonBase = ({
  message,
  children,
  size = 17,
  color = iconColors.main,
  name,
}) => {
  message = message || children;
  return (
    <View style={mainCSS.centerRow}>
      <Icon size={size * 1.65} color={color} name={name} />
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
  style,
  backgroundColor = iconColors.bgMain,
  onPress,
  ...props
}) =>
  <TouchableOpacity
    style={[mainCSS.button, { backgroundColor, borderColor: backgroundColor }, style]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <IconButtonBase {...props} />
  </TouchableOpacity>;

/*
export const IconButton = ({
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
  >
    <IconButtonBase {...props} />
  </TouchableOpacity>;
*/

export const IconLink = ({ to, ...props }) =>
  <NavLink to={to} style={mainCSS.a_link} component={TouchableOpacity}>
    <IconButtonBase {...props} />
  </NavLink>;

/*
    activeStyle={{ color: iconColors.main, textDecoration: 'underline' }}

export const IconLinkPlatform = IconButtonBase => ({ to, ...props }) =>
  // let linkProps = {
  //   to,
  //   style: mainCSS.a_link,
  //   activeStyle: { color: iconColors.main, textDecoration: 'underline' },
  // };
  // if (os.isNative) linkProps.component = TouchableOpacity;
  <NavLink to={to} component={TouchableOpacity} style={mainCSS.a_link}>
    <IconButtonBase {...props} />
  </NavLink>;  

*/
