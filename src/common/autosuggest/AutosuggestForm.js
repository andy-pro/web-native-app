import React from 'react';

import { View, TextInput, FormWrapper } from '../components';
import {
  // FindSimple,
  FindMultiword,
  RenderMultiword,
  // RenderSimple,
  // RenderHighlight,
} from '../__components/Popup';
import { mainCSS } from '../styles';
import initialState from '../initialState';
import os from '../os';

const { presidents } = initialState;

class PresidentForm extends React.Component {
  componentWillMount() {
    let popups = {
      name: {
        list: presidents,
        pos: { maxHeight: os.isNative ? 202 : 286 },
        key: 'president', // key of item to display, used for render helpres and find helpers
        getSuggestions: FindMultiword,
        renderSuggestion: RenderMultiword,
        onSelect: suggestion => {
          // this.props.fields.name.onChangeText(suggestion.president);
          this.props.fields.__setState({
            name: suggestion.president,
          });
          this.props.fields.__refs.name.focus();
          this.props.onSelect({
            name: 'insert',
            path: 'presidents',
            entry: suggestion,
          });
        },
      },
    };
    this.popup = this.context.popup.init(popups, this.props.fields);
  }

  componentWillReceiveProps(nextProps) {
    this.popup.trigger(nextProps.fields);
  }

  render() {
    let { name } = this.props.fields;
    return (
      <View style={[mainCSS.form, mainCSS.vgap20]} onKeyDown={this.popup.onKeyDown}>
        <View style={mainCSS.formRow}>
          <TextInput
            placeholder={'Type president name'}
            {...name}
            {...this.textInputProps}
          />
        </View>
      </View>
    );
  }

  onBlur = e => this.popup.onBlur(e);

  textInputProps = {
    onBlur: this.onBlur,
    keyboardType: 'default',
    returnKeyType: 'done',
    autoCapitalize: 'sentences',
    style: mainCSS.input,
  };
}

PresidentForm.contextTypes = {
  popup: React.PropTypes.object,
};

const Model = {
  fields: { fn: 'name', af: true },
};

export default FormWrapper(Model)(PresidentForm);
