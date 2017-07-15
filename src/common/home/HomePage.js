import React from 'react';
import { View, Text, Image } from '../components';
// import { TouchableOpacity, View, Image, Svg, Circle, Rect, SvgText } from '../components';
import { mainCSS } from '../styles';

const earth = require('./logo.png');

export default ({ history, layout }) => {
  let size = layout.height ? Math.min(310, layout.height - 150) : 310;
  return (
    <View style={[mainCSS.fullMain, { alignItems: 'center' }]}>
      <Text
        style={{
          fontSize: 24,
          color: '#777',
          paddingVertical: 20,
        }}
      >
        Welcome to React Native!
      </Text>
      <Image source={earth} style={{ width: size }} />
    </View>
  );
};
