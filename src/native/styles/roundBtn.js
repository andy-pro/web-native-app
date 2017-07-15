import { StyleSheet } from 'react-native';
import { colors } from '../../common/const';

export const roundBtnCSS = StyleSheet.create({
  button: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    // bottom: 80,
    bottom: 25,
    right: 25,
    backgroundColor: colors.header,
    width: 60,
    height: 60,
    borderRadius: 30,
    // paddingTop: 1,
    opacity: 0.7,
    // zIndex: 2, // root of Evil
  },
  text: {
    // textAlign: 'center',
    color: '#fff',
    fontSize: 40,
    // lineHeight: 40,
    // textShadowColor: 'black',
  },
});
