import React from 'react';
import { connect } from 'react-redux';
import { setCommand } from '../app/actions';
import { View } from '../components';
import RoundButton from './RoundButton';
import { colors, mainCSS } from '../styles';

// prettier-ignore
export default  connect(
  /* props */
  ({ app }) => ({
    command: app.command,
    entry: app.entry,
  }),
  /* actions */
  { setCommand })(
props =>
  <View style={[mainCSS.roundToolBar, mainCSS.pullRightRow, mainCSS.centerRow]}>
    {props.entry && <RoundButton {...props} icon="ti-edit" color={colors.success} size={20} cmd="pre_update" />}
    {props.entry && <RoundButton {...props} icon="go-diff-removed" color={colors.alarm} size={25} cmd="remove" />}
    <RoundButton {...props} icon="go-diff-added" color={colors.main} size={30} cmd="pre_insert" />
  </View>)
