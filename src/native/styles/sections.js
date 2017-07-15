import { StyleSheet } from 'react-native';
import { opts, colors } from '../../common/const';

export const sectionsCSS = StyleSheet.create({
  header: {
    backgroundColor: colors.success,
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: opts.gaps,
    marginHorizontal: 1,
  },
  title: {
    fontSize: opts.fontSize * 1.2,
    fontWeight: '600',
  },
  item: {
    // borderTopColor: colors.silver,
    // borderTopWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: opts.gaps,
    marginHorizontal: 1,
    // color: colors.dark,
    // fontSize: opts.fontSize,
  },
  anchor: {
    // ':hover': {
    //   textDecoration: 'underline',
    // },
    fontSize: opts.fontSize * 0.9,
    paddingVertical: 5,
    // display: 'block',
    // margin: '20px 2px',
  },
  aux: {
    fontSize: 12,
    fontStyle: 'italic',
    // display: 'inline-block'
  },
  extra: {
    fontSize: 12,
    color: '#383',
    // paddingRight: 10,
  },
  badge: {
    color: '#555',
    fontSize: 11,
    backgroundColor: '#ddd',
    paddingHorizontal: 3,
    paddingVertical: 1,
    // marginLeft: 10,
    marginVertical: 2,
    borderRadius: 3,
    borderColor: '#ccc',
    // borderStyle: 'solid',
    borderWidth: 1,
  },
});
