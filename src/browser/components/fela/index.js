import React, { Component } from 'react';

import create from './createComponent';
import os from '../../../common/os';

export const Text = create('span', [
  'data-path',
  'onPress',
  'onLongPress', // onLongPress must be after onPress (onPress re-writing)
]);

export const View = create('div', ['data-path', 'onKeyDown', 'onPress', '$ref']);

export const AnchorLink = create('a', ['download', 'href', 'target']);

const ButtonBase = create('button', ['onPress']);
export const Button = ({ title, color, style = {}, ...props }) => {
  let key = os.isIos ? 'color' : 'backgroundColor';
  style[key] = color;
  return (
    <ButtonBase style={style} {...props}>
      {title}
    </ButtonBase>
  );
};

create('button', ['onPress', 'title']);

export const TextInput = create('input', [
  'required',
  'placeholder',
  'onChangeText',
  'value',
  'autoFocus',
  'onFocus',
  'onBlur',
  '$ref',
  'editable',
  'step',
  { type: 'text' },
]);

export const FileInput = create('input', ['onChangeText', '$ref', { type: 'file' }]);

// hidden button for submit
const FormBase = create('form', ['onSubmit', 'onKeyDown']);
export const Form = ({ children, ...props }) =>
  <FormBase {...props}>
    {children}
    <Button style={{ display: 'none' }} />
  </FormBase>;

export const TouchableHighlight = create('div', [
  'activeOpacity',
  'underlayColor',
  'onPress',
  'onLongPress', // onLongPress must be after onPress (onPress re-writing)
  'title',
  '$ref',
]);

export const TouchableOpacity = TouchableHighlight;

export const ScrollView = create('div', ['onPress', { style: { overflow: 'auto' } }]);

export const Image = create('img', ['source']);

const Select = create('select', ['selectedValue', 'onValueChange', 'enabled', '$ref']);

const Option = create('option', ['value']);

export class Picker extends Component {
  static Item = ({ label, value }) =>
    <Option value={value}>
      {label}
    </Option>;

  render() {
    let { children, ...props } = this.props;
    return (
      <Select {...props}>
        {children}
      </Select>
    );
  }
}

/* SVG */
const svg_props = [
  'x',
  'y',
  'cx',
  'cy',
  'r',
  'width',
  'height',
  'stroke',
  'strokeWidth',
  'fill',
];
const svg_text_props = ['fontSize', 'fontWeight', 'textAnchor'];

export const Svg = create('svg', ['width', 'height', 'viewBox']);
export const G = create('g', svg_props);
export const Path = create('path', ['d']);
export const Circle = create('circle', svg_props);
export const Rect = create('rect', svg_props);
export const SvgText = create('text', svg_props.concat(svg_text_props));

/*
Common props:
'fill',
'fillOpacity',
'stroke',
'strokeWidth',
'strokeOpacity',
'strokeLinecap',
'strokeLinejoin'
'strokeDasharray',
'strokeDashoffset',
'x',
'y',
'rotate',
'scale',
'origin',
'originX',
'originY'
*/
