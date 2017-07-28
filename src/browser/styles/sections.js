import { opts, colors } from '../../common/const';

export const sectionsCSS = {
  header: {
    backgroundColor: colors.submain,
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: opts.gaps,
    // marginTop: 10,
  },
  title: {
    color: colors.main,
    fontWeight: '600',
  },
  item: {
    color: colors.dark,
    paddingVertical: 5,
    paddingHorizontal: opts.gaps,
    userSelect: 'none',
  },
  anchor: {
    ':hover': {
      textDecoration: 'underline',
    },
    fontSize: opts.fontSize * 0.9,
    paddingVertical: 5,
    display: 'block',
    // margin: '20px 2px',
  },
  aux: {
    fontSize: opts.fontSize * 0.8,
    fontStyle: 'italic',
    // display: 'inline-block'
  },
  extra: {
    fontSize: opts.fontSize * 0.8,
    color: '#383',
    // paddingRight: 10,
  },
  badge: {
    color: '#555',
    fontSize: opts.fontSize * 0.7,
    backgroundColor: '#fec',
    paddingHorizontal: 3,
    marginTop: 3,
    borderRadius: 3,
    ...colors.border,
  },
};
