import { opts, colors } from '../../common/const';

export const suggestionsCSS = {
  root: {
    flex: 1,
    position: 'relative',
  },

  list: {
    position: 'absolute',
    top: opts.headerH, // will be overwritten by measuring
    left: opts.gaps + 10,
    maxHeight: 174,
    backgroundColor: '#f0f0f0',
    // marginHorizontal: 4,
    borderColor: '#8a8',
    borderWidth: 1,
    // borderStyle: 'solid',
    // overflow: 'auto', // visible, hidden, scroll
    overflow: 'auto',
    padding: 2,
    minWidth: 150,
    boxShadow: '2px 2px 10px grey',
    whiteSpace: 'nowrap',
  },

  view: {
    backgroundColor: '#f6f6f6',
    ...colors.border,
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 30,
    ':hover': {
      backgroundColor: colors.submain,
    },
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

suggestionsCSS.selected = [suggestionsCSS.view, { backgroundColor: colors.submain }];
