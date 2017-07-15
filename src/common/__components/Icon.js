import React from 'react';
import { Svg } from '../components';
import svgs from '../svgs';

/*
  'key' property for SVG
  почему-то иногда не перерисовывается иконка
  ???
*/
export default ({
  svg,
  name,
  stroke,
  strokeWidth,
  size = 32,
  viewBox = '0 0 40 40',
  height = '40',
  width = '40',
  color = '#000',
}) =>
  <Svg height={size || height} width={size || width} viewBox={viewBox} key={name}>
    {React.cloneElement(svg || svgs[name] || svgs['__no_name__'], {
      fill: color,
      stroke,
      strokeWidth,
    })}
  </Svg>;
