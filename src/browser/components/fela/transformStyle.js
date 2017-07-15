const directionMapping = {
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
};

const transformDirection = style => {
  for (let prop in directionMapping) {
    let val = style[prop];
    if (val) {
      delete style[prop];
      style[directionMapping[prop][0]] = val;
      style[directionMapping[prop][1]] = val;
    }
  }
};

const transformStyle = ({ theme, style }) => {
  // console.log('TRANSFORM', theme, style);
  // console.log('==========================');
  if (style.borderWidth) style.borderStyle = 'solid';
  if (style.borderBottomWidth) style.borderBottomStyle = 'solid';
  if (style.borderTopWidth) style.borderTopStyle = 'solid';
  if (style.borderLeftWidth) style.borderLeftStyle = 'solid';
  if (style.borderRightWidth) style.borderRightStyle = 'solid';

  transformDirection(style);
  // style.fontFamily = theme.text.fontFamily
  // console.log('result style', JSON.stringify(style));
  return style;
};

export default transformStyle;
