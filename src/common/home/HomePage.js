import React from 'react';
import { View, Text, Link, Image } from '../components';
import { mainCSS } from '../styles';
import img from '../__components/img/logo.png';

export default ({ history, layout }) => {
  let size = layout.height ? Math.min(310, layout.height - 150) : 310;
  return (
    <View style={[mainCSS.fullMain, { alignItems: 'center' }]}>
      <Text style={mainCSS.title}>Welcome to React Native!</Text>
      <View>
        <Text>Sharing Code</Text>
      </View>
      <View>
        <Text>
          React Web {'<>'} React Native
        </Text>
      </View>
      <Link to="https://github.com/andy-pro/web-native-app" message="source" />
      <Image source={img} style={{ width: size, marginVertical: 20 }} />
    </View>
  );
};
