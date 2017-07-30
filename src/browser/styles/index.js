import { opts, colors, iconColors } from '../../common/const';

export { colors, iconColors, opts };
export { headerCSS, sideCSS } from './header';
export { sectionsCSS } from './sections';
export { suggestionsCSS } from './suggestions';

// alignItems: flex-start | flex-end | center | baseline | stretch (default)
// justifyContent: flex-start (default) | flex-end | center | space-between | space-around

const col = {
  display: 'flex',
  flexDirection: 'column',
};

const center = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const mainCSS = {
  root: {
    ...col,
    fontFamily: opts.fontFamily,
    fontSize: opts.fontSize,
    backgroundColor: colors.background,
    color: colors.dark,
    height: '100vh',
    alignItems: 'center',
  },
  fullMain: {
    // full along the main axis
    ...col,
    flex: 1,
    // width: '100%',
  },
  fullArea: {
    // full on both axes
    ...col,
    flex: 1,
    width: '100%',
    // position: 'relative',
  },
  fullWidth: {
    // position: 'relative',
    width: '100%',
  },
  limited: {
    maxWidth: opts.maxWidth,
    position: 'relative',
  },
  sideMenuLimited: {
    maxWidth: opts.maxWidth,
    marginLeft: opts.menuWidth,
    // position: 'relative',
  },
  list: {
    overflow: 'auto',
    marginVertical: 10,
  },
  fullWindow: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fillContainer: {
    position: 'relative',
    width: '100%',
    flex: 1,
  },
  center: {
    flex: 1,
    ...center,
  },

  text: {
    fontSize: opts.fontSize,
    color: colors.dark,
  },
  title: {
    fontSize: 24,
    color: '#777',
    paddingVertical: 20,
  },
  subTitle: {
    fontSize: opts.fontSize,
    fontWeight: '600',
    lineHeight: opts.fontSize + 'px',
    marginTop: 3,
    // whiteSpace: 'nowrap',
  },

  divider: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
    // marginBottom: 10,
  },
  vgap20: {
    marginTop: 20,
  },

  row: {
    display: 'flex',
  },
  centerRow: {
    display: 'flex',
    ...center,
  },
  between: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  pullRightRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  pullRightCol: {
    display: 'flex',
    flexDirection: 'column',
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
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 3,
  },
  formBtn: {},
  input: {
    ':focus': {
      borderColor: colors.main,
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(0,164,211,.6)',
    },
    width: 0,
    outline: 0,
    flex: 1,
    fontSize: opts.fontSize * 0.9,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // marginBottom: 6,
    borderRadius: 4,
    marginHorizontal: 5,
    transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
    ...colors.border,
    backgroundColor: colors.background,
  },
  button: {
    display: 'flex',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    padding: 3,
    cursor: 'pointer',
    marginHorizontal: 5,
  },
  prompt: {
    fontSize: 12,
    marginHorizontal: 5,
  },

  /* links */
  inline: {
    display: 'inline-block',
    padding: '0 0.3em',
  },
  v_link: {
    ':hover': {
      textDecoration: 'underline',
      // backgroundColor: colors.touch,
      // backgroundColor: 'red',
    },
    // cursor: 'pointer',
    // fontSize: opts.fontSize * 0.9,
    // fontFamily: opts.fontFamily,
  },
  a_link: {
    // ':hover': {
    // backgroundColor: colors.touch,
    // },
    // fontSize: opts.fontSize * 0.9,
    // color: colors.dark,
    textDecoration: 'none',
    // textDecoration: 'inherit',
    // padding: '6px 2px',
    // paddingTop: 6,
    // paddingBottom: 6,
    display: 'block',
    userSelect: 'none',
  },
  h_link: {
    textDecoration: 'underline',
  },

  /* footer */
  footer: {
    display: 'flex',
    backgroundColor: colors.footer,
    width: '100%',
    height: opts.footerH,
  },
  f_link: {
    color: colors.light,
    fontSize: opts.fontSize * 0.8,
  },

  /* RoundToolBar */
  roundToolBar: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  roundBtn: {
    display: 'flex',
    ...center,
    marginLeft: 15,
    opacity: 0.6,
    boxShadow: '2px 2px 15px black',
  },
};

mainCSS.picker = () => Object.assign({}, mainCSS.input, { paddingVertical: 3 });

export const checkboxCSS = {
  input: {
    marginHorizontal: 5,
  },
  image: {
    top: 4,
    position: 'relative',
    width: 18,
    marginRight: 6,
  },
  label: {
    color: colors.dark,
    fontSize: opts.fontSize * 0.9,
    paddingRight: 10,
    // cursor: 'pointer',
  },
};

const menuImg = require('../../common/__components/img/background.jpg');

export const menuCSS = {
  root: {
    backgroundImage: `url(${menuImg})`,
    backgroundSize: '100% 100%',
    width: opts.menuWidth - opts.gaps,
    boxShadow: '2px 2px 5px gray',
    ...colors.border,
  },
  link: {
    '> a': {
      ':hover': {
        color: colors.highlight,
      },
      textDecoration: 'none',
      display: 'block',
      userSelect: 'none',
      // padding: '8px 30px',
      padding: `${opts.fontSize / 2}px ${opts.fontSize * 2}px`,
      color: colors.silver,
    },
  },
};

export const inputSetDef = {
  style: mainCSS.input,
};
