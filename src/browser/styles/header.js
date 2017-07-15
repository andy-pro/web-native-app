import { opts, colors } from '../../common/const';

export const headerCSS = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.header,
    height: opts.headerH,
    color: colors.light,
  },
  title: {
    display: 'block',
    fontSize: opts.fontSize * 1.2,
    textAlign: 'center',
    marginTop: 6,
  },
  dropdown: {
    top: 50,
    right: 40,
    position: 'absolute',
    zIndex: 2,
  },
  content: {
    width: '100%',
  },
};

export const sideCSS = {
  root: {
    position: 'relative',
    width: opts.maxWidth + opts.menuWidth,
  },
  title: {
    // display: 'block',
    fontSize: opts.fontSize * 1.6,
    // textAlign: 'center',
    marginTop: 10,
  },
  dropdown: {
    top: 10,
    left: 0,
    position: 'absolute',
    zIndex: 2,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    width: '100%',
    height: opts.headerH,
    color: colors.dark,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    // marginBottom: 10,
    marginLeft: opts.menuWidth,
  },
};
