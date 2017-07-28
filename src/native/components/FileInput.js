import React from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';

import { RenderSimple, RenderHighlight } from '../Popup';
import { appError } from '../../app/actions';

import * as rnfs from '../../../native/backup';
import __config from '../../config';

class FileInputBase extends React.Component {
  componentDidMount() {
    this.popups = {
      importName: {
        name: 'importName',
        pos: { maxHeight: 230 },
        popupOnEmpty: true,
        getSuggestions: this.getFileList, // args: query
        renderSuggestion: RenderSimple, // args: suggestion, popup
        onSelect: suggestion => {
          // args: suggestion, popup
          // this.props.fields.importName.onChangeText(suggestion.title)
          this.element.blur();
          this.focused = false;
          this.props.onChangeText(suggestion.title);
          // this.props.fields.importName.files = [suggestion]
        },
      },
    };

    this.popupMenu = this.context.popup.init(this.popups);
    this.element = this.props.getElement();
  }

  getFileList = query => {
    // console.log('query', query);
    let f = this.fileList
      .filter(item => !query || item.name.indexOf(query) > -1)
      .map(item => ({ title: item.name }));
    if (f.length === 1 && f[0].title === query) {
      f = [];
    }
    return f;
    // .map(item => {
    //   item.title = item.name
    //   return item
    // })
  };

  componentWillReceiveProps(nextProps) {
    // console.log('cwrp', nextProps.fields === this.props.fields, nextProps.fields.__name, Boolean(nextProps.fields.__element));
    if (nextProps.value !== this.props.value) {
      // this.popupMenu(nextProps.fields)
      this.trigger(nextProps.value);
    }
  }

  trigger = __query => {
    // console.log('trigger input:', this.focused);
    if (this.focused) {
      this.popupMenu({
        __name: 'importName',
        __element: this.element,
        __query,
      });
    }
  };

  onFocus = e => {
    this.focused = true;
    rnfs.readAppDir(__config.appName, fileList => {
      let { value, setFileList } = this.props;
      // let __element = fields.__refs.importName
      // let __element = getElement()
      // console.log('el', __element === e.target, __element === e.currentTarget, e.target === e.currentTarget);
      // __query = fields.importName.value
      this.fileList = fileList;

      // this.props.fileList = fileList
      // fields.importName.fileList = fileList
      setFileList(fileList);
      // this.popupMenu({
      //   __name: 'importName',
      //   __element,
      //   __query: this.props.value,
      // })
      this.trigger(value);
    });
  };

  render() {
    // props: placeholder, value, onChangeText, style
    // let { fields, $ref, ...props } = this.props
    let { placeholder, value, onChangeText, style, $ref } = this.props,
      props = { placeholder, value, onChangeText, style };
    return (
      <TextInput
        {...props}
        ref={$ref}
        onBlur={e => this.popups.__onBlur(e)}
        onFocus={this.onFocus}
        returnKeyType="done"
        keyboardType="default"
      />
    );
  }
}

FileInputBase.contextTypes = {
  popup: React.PropTypes.object,
};

export const FileInput = connect(null, { appError })(FileInputBase);
