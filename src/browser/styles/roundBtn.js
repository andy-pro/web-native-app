import { colors } from '../../common/const';

export const roundBtnCSS = {
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 25,
    borderRadius: 30,
    backgroundColor: colors.header,
    width: 60,
    height: 60,
    opacity: 0.5,
    boxShadow: '2px 2px 15px black',
    // zIndex: 2,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
    textShadow: '2px 2px 4px black',
    // textShadowColor: 'black',
  },
};
