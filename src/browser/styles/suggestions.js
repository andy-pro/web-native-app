import { opts, colors } from '../../common/const';

export const suggestionsCSS = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'relative',
  },
  list: {
    position: 'absolute',
    top: opts.headerH, // will be overwritten by measuring
    left: opts.gaps + 10,
    maxHeight: 174,
    backgroundColor: '#f0f0f0',
    overflow: 'auto',
    padding: 2,
    minWidth: 150,
    boxShadow: '2px 2px 5px gray',
    whiteSpace: 'nowrap',
    ...colors.border,
  },
  view: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 30,
    ...colors.border,
  },
  text: {
    fontWeight: 'bold',
    fontSize: opts.fontSize * 0.8,
    color: colors.dark,
  },
  amount: {
    // textAlign: auto, left, right, center, justify
    textAlign: 'right',
  },
  highlight: {
    // color: colors.alarm,
    color: 'red',
  },
};
