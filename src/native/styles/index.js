import { StyleSheet } from 'react-native';
import { opts, colors, iconColors } from '../../common/const';

export { opts, colors, iconColors };
export { headerCSS } from './header';
export { sectionsCSS } from './sections';
export { roundBtnCSS } from './roundBtn';

// alignItems: flex-start | flex-end | center | baseline | stretch (default)
// justifyContent: flex-start (default) | flex-end | center | space-between | space-around

const center = {
  alignItems: 'center',
  justifyContent: 'center',
};
export const mainCSS = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  fullMain: {
    // full along the main axis
    flex: 1,
  },
  fullArea: {
    // full on both axes
    flex: 1,
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  limited: {
    maxWidth: opts.maxWidth,
  },
  list: {
    // overflow: 'auto',
  },
  fullWindow: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    ...center,
  },
  fillContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  text: {
    fontSize: opts.fontSize,
    color: colors.dark,
  },
  subTitle: {
    fontSize: opts.fontSize,
    fontWeight: '600',
  },

  divider: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
  },

  row: {
    flexDirection: 'row',
  },
  centerRow: {
    flexDirection: 'row',
    ...center,
  },
  between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pullRightRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pullRightCol: {
    alignItems: 'flex-end',
  },
  active: {
    backgroundColor: colors.active,
  },

  /* form styles */
  form: {
    paddingVertical: 6,
    paddingHorizontal: opts.gaps,
    backgroundColor: colors.active,
  },
  formRow: {
    flexDirection: 'row',
  },
  formBtn: {
    marginBottom: 3,
  },
  input: {
    flex: 1,
    fontSize: opts.fontSize,
    paddingHorizontal: 8,
    paddingVertical: 1,
    // marginTop: 4,
  },
  picker: {
    flex: 1,
    // flexDirection: 'row',
    // paddingHorizontal: 8,
    // paddingLeft: -5,
    // margin: 0,
    height: 35,
    marginTop: 6,
    // lineHeight: 1,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 12,
    width: 80,
    justifyContent: 'center',
    ...colors.border,
  },

  /* links */
  h_link: {
    marginHorizontal: 20,
    paddingHorizontal: 15,
    fontSize: opts.fontSize * 1.3,
    color: '#559',
    textDecorationLine: 'underline',
    // backgroundColor: '#ffa',
  },
  a_link: {
    padding: 6,
  },

  /* footer */
  footer: {
    width: '100%',
    backgroundColor: colors.footer,
    height: opts.footerH,
  },
  f_link: {
    color: colors.light,
    fontSize: opts.fontSize * 0.8,
  },
});

export const checkboxCSS = StyleSheet.create({
  input: {
    flexDirection: 'row',
    marginVertical: 4,
    // marginTop: 6,
    marginLeft: 3,
    alignItems: 'center',
  },
  image: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    // paddingVertical: 10,
    paddingRight: 10,
  },
});
