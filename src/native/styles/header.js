import { StyleSheet } from 'react-native';
import { opts, colors } from '../../common/const';

export const headerCSS = StyleSheet.create({
  root: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.header,
    height: opts.headerH,
    // paddingHorizontal: opts.gaps,
    // zIndex: 2, // !!! ломает отображение даже с отключенным хидером !!!
  },
  title: {
    color: colors.light,
    fontSize: opts.fontSize * 1.4,
    textAlign: 'center',
    marginBottom: -3,
    // lineHeight: '1',
  },
});
