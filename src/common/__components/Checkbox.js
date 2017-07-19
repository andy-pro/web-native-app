import React from 'react';
import { Image, Text, TouchableOpacity } from '../components';
import { colors, checkboxCSS } from '../styles';
import img_on from './img/CheckboxChecked.png';
import img_off from './img/Checkbox.png';

export default ({ checked, onPress, label, disabled }) =>
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={disabled ? null : onPress}
    style={checkboxCSS.input}
  >
    <Image source={checked ? img_on : img_off} style={checkboxCSS.image} />
    {label &&
      <Text style={[checkboxCSS.label, disabled ? { color: colors.disabled } : null]}>
        {label}
      </Text>}
  </TouchableOpacity>;
