import React from 'react';
import { connect } from 'react-redux';
import { setCommand } from '../app/actions';
import { Text, TouchableHighlight } from '../components';
import { roundBtnCSS, colors } from '../styles';
import os from '../os';

export default connect(
  /* props */
  ({ app }) => ({
    command: app.command,
  }),
  /* actions */
  { setCommand }
)(({ urlParts, fullMapView, isMap, command, setCommand, history }) => {
  let cmd = command && command.name,
    path = urlParts[0],
    hide = cmd === 'pre_insert' || cmd === 'pre_update' || path === '/';
  return hide
    ? null
    : <TouchableHighlight
        onPress={() => {
          let _map = path === '/map',
            payload = { name: 'pre_insert', path };
          if (_map) payload.external = true;
          setCommand(payload);
          if (_map) {
            setTimeout(() => history.push('/locations'), 0);
          }
        }}
        style={[roundBtnCSS.button, isMap && os.isBrowser && { right: 50 }]}
        underlayColor={colors.mainTouch}
      >
        <Text style={roundBtnCSS.text}>+</Text>
      </TouchableHighlight>;
});
// activeOpacity={0.4}
