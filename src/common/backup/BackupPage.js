import React, { Component } from 'react';
import { connect } from 'react-redux';

import { exportData, importData } from './actions';
import {
  Form,
  View,
  Text,
  TextInput,
  TextArea,
  FileInput,
  IconButton,
  Picker,
  FormWrapper,
} from '../components';
import { removeSpecial } from '../__lib/utils';
import { colors, mainCSS } from '../styles';
import __data from '../__data';
import os from '../os';

const textInputProps = {
  keyboardType: 'default',
  returnKeyType: 'done',
  autoCapitalize: 'sentences',
  style: mainCSS.input,
};

class BackupPage extends Component {
  componentWillReceiveProps({ importedData, fields }) {
    if (importedData !== this.props.importedData) {
      fields.__setState({ importedData });
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  onExportSubmit = (data, fields) => {
    if (this.props.disabled || !data) return;
    this.props.exportData(data.textData, {
      exportName: data.exportName,
      source: 'backup',
    });
    fields.__setState({ exportName: '' });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  onImportSubmit = (data, fields) => {
    if (this.props.disabled || !data) return;
    this.props.importData(data);
    fields.__setState({ importName: '' });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  render() {
    let { fields, onExportSubmit, onImportSubmit, disabled } = this.props,
      { messages: T } = os,
      color = disabled ? colors.disabled : colors.success,
      { textData, exportName, importName, mode, importedData } = fields;
    return (
      <View style={mainCSS.vgap20}>
        <Form style={mainCSS.form} onSubmit={onExportSubmit}>
          <View style={mainCSS.formRow}>
            <TextArea multiline numberOfLines={6} {...textData} {...textInputProps} />
          </View>
          <View style={[mainCSS.formRow, mainCSS.center]}>
            <Text>Export the above text to a file</Text>
          </View>
          <View style={mainCSS.formRow}>
            <TextInput
              placeholder={T['placeholders.file.name']}
              {...exportName}
              {...textInputProps}
            />
            <IconButton
              name="md-cloud-upload"
              backgroundColor={exportName.value ? color : colors.disabled}
              onPress={onExportSubmit}
              message={T['export']}
            />
          </View>
        </Form>

        <View style={mainCSS.divider} />

        <Form style={mainCSS.form} onSubmit={onImportSubmit}>
          <View style={mainCSS.formRow}>
            <FileInput
              placeholder={T['placeholders.file.input']}
              {...importName}
              {...textInputProps}
            />
          </View>
          <View style={mainCSS.formRow}>
            <Picker {...mode} style={mainCSS.picker} enabled={Boolean(importName.value)}>
              <Picker.Item label={T['mode.replace']} value="replace" />
              <Picker.Item label={T['mode.merge']} value="merge" />
            </Picker>
            <IconButton
              name="md-cloud-download"
              backgroundColor={importName.value ? color : colors.disabled}
              onPress={onImportSubmit}
              message={T['import']}
            />
          </View>
          <View style={mainCSS.formRow}>
            <TextArea multiline numberOfLines={6} {...importedData} {...textInputProps} />
          </View>
        </Form>
      </View>
    );
  }
}

const Model = [
  {
    submit: 'onExportSubmit',
    fields: [
      { fn: 'textData', init: __data.lorem },
      { fn: 'exportName', vd: 'required', pp: removeSpecial },
    ],
  },
  {
    submit: 'onImportSubmit',
    fields: [
      { fn: 'importName', type: 'file', vd: 'required' },
      { fn: 'mode', type: 'picker', init: 'replace' },
      { fn: 'importedData' },
    ],
  },
];

export default connect(
  ({ app }) => ({
    importedData: app.importedData,
    // disabled: app.fetching,
  }),
  { exportData, importData }
)(FormWrapper(Model)(BackupPage));
