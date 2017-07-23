import React from 'react';
import { View, Text, Image } from '../components';
import { mainCSS } from '../styles';
import img from '../__components/img/logo.png';

export default ({ history, layout }) => {
  let size = layout.height ? Math.min(310, layout.height - 150) : 310;
  return (
    <View style={[mainCSS.fullMain, { alignItems: 'center' }]}>
      <Text style={mainCSS.title}>Welcome to React Native!</Text>
      <Image source={img} style={{ width: size }} />
    </View>
  );
};
