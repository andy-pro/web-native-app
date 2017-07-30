import React from 'react';
import shortid from 'js-shortid';

import { View, TextInput, FormWrapper } from '../components';
import {
  // FindSimple,
  FindMultiword,
  RenderMultiword,
  // RenderSimple,
  // RenderHighlight,
} from '../__components/Popup';
import { inputSetDef, mainCSS } from '../styles';
import initialState from '../initialState';
import os from '../os';

const { presidents } = initialState;

class PresidentForm extends React.Component {
  componentWillMount() {
    let popups = {
      name: {
        list: presidents,
        style: { maxHeight: os.isNative ? 202 : 286 },
        key: 'president', // key of item to display, used for render helpres and find helpers
        getSuggestions: FindMultiword,
        renderSuggestion: RenderMultiword,
        // renderSuggestion: RenderSimple,
        onSelect: this.onNameSelect,
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
            onBlur={this.onBlur}
            {...name}
            {...inputSetDef}
          />
        </View>
      </View>
    );
  }

  onBlur = e => this.popup.onBlur(e);

  /* onSelect handlers */
  onNameSelect = (entry, fields) => {
    // fields.name.onChangeText(entry.president);
    fields.__setState({
      name: entry.president,
    });
    fields.__refs.name.focus();
    entry.key = shortid.gen();
    this.props.onSelect({
      name: 'insert',
      path: 'presidents',
      entry,
    });
  };
}

PresidentForm.contextTypes = {
  popup: React.PropTypes.object,
};

const Model = {
  fields: { fn: 'name', af: true },
};

export default FormWrapper(Model)(PresidentForm);
