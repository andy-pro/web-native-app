import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { View, Text, TouchableOpacity, TouchableHighlight, AnchorLink } from './fela';
import { mainCSS } from '../styles';

const TouchLink = ({ to, ...props }, { router }) =>
  <TouchableOpacity to={() => router.history.push(to)} {...props} />;

TouchLink.contextTypes = {
  router: PropTypes.object,
};

export { TouchLink };

/*
export const Link = props =>
  typeof props.to === 'function'
    ? <Text onClick={props.to} style={mainCSS.t_link} />
    : props.to.includes('://')
      ? <AnchorLink
          {...props}
          href={props.to}
          target="_blank"
          style={[mainCSS.h_link, props.style]}
        >
          {props.message}
        </AnchorLink>
      : <View style={[props.style, mainCSS.v_link]}>
          <NavLink
            exact={props.exactly}
            activeStyle={{ textDecoration: 'underline' }}
            to={props.to}
            style={mainCSS.a_link}
          >
            {props.message}
            {props.children}
          </NavLink>
        </View>;
*/

export const Link = ({ to, exact, style, message, children, ...props }) =>
  typeof to === 'function'
    ? <Text onClick={to} style={mainCSS.t_link} />
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

// style={Object.assign({}, mainCSS.a_link, style.link)}
