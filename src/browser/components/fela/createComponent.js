import React from 'react';
import PropTypes from 'prop-types';
import transformStyle from './transformStyle';
import setLongPressEvent from './setLongPressEvent';

var clone = obj => {
  var copy = {};
  for (var i in obj) copy[i] = obj[i];
  return copy;
};

const composeArray = arr => {
  var obj = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    var el = arr[i];
    if (typeof el === 'function') el = el();
    for (var j in el) obj[j] = el[j];
  }
  return obj;
};

function createComponent(type = 'div', passThroughProps = []) {
  var FelaComponent = function FelaComponent(
    { children, className, id, style, ...ruleProps },
    { renderer, theme = {} }
  ) {
    var cloned = false;
    var setHover = prop => {
      if (!cloned) {
        style = clone(style);
        cloned = true;
      }
      style[':hover'] = Object.assign({ cursor: 'pointer' }, style[':hover'], prop);
    };

    if (style instanceof Array) style = composeArray(style);
    else if (typeof style === 'function') style = style();
    else if (!style) style = {};

    var componentProps = passThroughProps.reduce((output, prop) => {
      if (typeof prop === 'object') {
        Object.assign(output, prop);
      } else if (ruleProps.hasOwnProperty(prop)) {
        switch (prop) {
          case 'enabled':
          case 'editable':
            if (ruleProps.enabled === false || ruleProps.editable === false)
              output.disabled = true;
            break;
          case 'onChangeText':
            output.onChange = ruleProps.onChangeText;
            break;
          case 'selectedValue':
            output.value = ruleProps.selectedValue;
            break;
          case 'numberOfLines':
            output.rows = ruleProps.numberOfLines;
            break;
          case 'onValueChange':
            output.onChange = ruleProps.onValueChange;
            break;
          case 'onPress':
            output.onClick = ruleProps.onPress;
            break;
          case 'onLongPress':
            setLongPressEvent(output, ruleProps);
            break;
          case '$ref':
            output.ref = ruleProps.$ref;
            break;
          case 'source':
            output.src = ruleProps.source;
            break;
          case 'underlayColor':
            setHover({ backgroundColor: ruleProps.underlayColor });
            break;
          case 'activeOpacity':
            setHover({ opacity: ruleProps.activeOpacity });
            break;
          default:
            output[prop] = ruleProps[prop];
        }
      }
      return output;
    }, {});

    componentProps.id = id;
    var cls = className ? className + ' ' : '';
    componentProps.className =
      cls + renderer.renderRule(transformStyle, { theme, style });

    return React.createElement(type, componentProps, children);
  };

  FelaComponent.contextTypes = {
    renderer: PropTypes.object,
    theme: PropTypes.object,
  };

  return FelaComponent;
}

export default createComponent;
