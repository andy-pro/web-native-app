import React from 'react';
import { TouchableOpacity, Icon } from '../components';
import { mainCSS } from '../styles';

export default ({ setCommand, icon, color, size, cmd, entry }) =>
  <TouchableOpacity
    onPress={() => setCommand({ name: cmd, path: 'locations', entry })}
    activeOpacity={0.5}
    style={[
      mainCSS.roundBtn,
      {
        backgroundColor: color,
        borderRadius: size,
        width: size * 2,
        height: size * 2,
      },
    ]}
  >
    <Icon name={icon} size={size * 1.25} />
  </TouchableOpacity>;
