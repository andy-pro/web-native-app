import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Text, TouchableOpacity, TouchableHighlight, AnchorLink } from './fela';
import { mainCSS } from '../styles';

const TouchLink = ({ to, onNavigate, ...props }, { router }) =>
  <TouchableOpacity
    onPress={event => {
      if (to) {
        router.history.push(to);
        if (onNavigate) {
          onNavigate({ event, path: to });
        }
      }
    }}
    {...props}
  />;

TouchLink.contextTypes = {
  router: PropTypes.object,
};

export { TouchLink };

export const Link = ({ to, exact, inline, style, message, children, ...props }) => {
  if (inline) style = Object.assign({}, style, mainCSS.inline);
  return typeof to === 'function'
    ? <Text onClick={to} style={[mainCSS.t_link, style]} />
    : to.includes('://')
      ? <AnchorLink href={to} target="_blank" style={[mainCSS.h_link, style]} {...props}>
          {message}
        </AnchorLink>
      : <TouchableHighlight style={[mainCSS.v_link, style]} {...props}>
          <NavLink exact={exact} to={to} activeStyle={{ textDecoration: 'underline' }}>
            {message}
            {children}
          </NavLink>
        </TouchableHighlight>;
};
