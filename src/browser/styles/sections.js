import { opts, colors } from '../../common/const';

export const sectionsCSS = {
  header: {
    backgroundColor: colors.success,
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: opts.gaps,
    // marginTop: 10,
  },
  title: {
    color: colors.main,
    fontSize: opts.fontSize,
    fontWeight: '600',
  },
  item: {
    // borderTopColor: colors.silver,
    // borderTopWidth: 1,
    color: colors.dark,
    paddingVertical: 5,
    paddingHorizontal: opts.gaps,
    userSelect: 'none',
    // paddingHorizontal: 10,
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
    backgroundColor: '#fec',
    paddingHorizontal: 3,
    paddingVertical: 1,
    // marginLeft: 10,
    marginVertical: 2,
    borderRadius: 3,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
  },

  /*
  groupMaster: {
    paddingVertical: 5,
  },
  groupInfo: {
    paddingLeft: 10,
  },
  amount: {
    fontSize: 13,
    color: colors.main,
    fontWeight: 'normal',
    marginLeft: 10,
  },
  income: {
    color: '#4a4',
    // fontWeight: 'bold',
  },
  resumeTitle: {
    fontSize: 14,
    // fontStyle: 'italic',
    // fontWeight: '600',
    display: 'block',
  },
  resume: {
    fontSize: 13,
    fontStyle: 'italic',
    // color: '#888'
  },
  summary: {
    fontSize: 14,
    color: '#fff',
    padding: 5,
    borderRadius: 6,
    // borderColor: '#fff',
    // borderWidth: 1,
  },
  summaryR: {
    backgroundColor: '#e99',
  },
  summaryG: {
    backgroundColor: '#6b6',
  },
  summaryView: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  */
};
