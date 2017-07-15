import React from 'react';
import { Image, Text, TouchableOpacity } from './';
import { checkboxCSS } from '../__themes'

const Checkbox = ({ checked, onPress, label, disabled }) => {

  const image = checked
    ? require('./img/CheckboxChecked.png')
    : require('./img/Checkbox.png');

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={disabled ? null : onPress}
      style={checkboxCSS.input}
    >
      <Image source={image} style={checkboxCSS.image}/>
      {label &&
        <Text style={[checkboxCSS.label, disabled ? {color: '#999'} : null]}>
          {label}
        </Text>
      }
    </TouchableOpacity>
  );
};

export default Checkbox;
