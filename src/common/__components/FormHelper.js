import React from 'react';
import slugify from 'slugify';

import { findDuplicateByObj } from '../__lib/find';
import { FormWrapper, Dialogs } from '../components';

const propsTextInput = {
  keyboardType: 'default',
  returnKeyType: 'done',
  autoCapitalize: 'sentences',
};

export default Form =>
  FormWrapper(Form.model)(
    class extends React.Component {
      componentWillMount() {
        let { mode, entry, fields } = this.props;
        if (mode === 'pre_update') {
          fields.__setState(entry);
        }
        if (Form.onFormMount) Form.onFormMount(this.props);
      }

      // componentDidMount() {
      //   this.setFocus();
      // }

      // setFocus = () => {
      // if (this.props.mode) this.props.fields.__refs.name.focus();
      // };

      shouldComponentUpdate({ mode, entry }) {
        let editMode = mode === 'pre_update',
          newEntry = entry !== this.props.entry && editMode,
          newMode = mode !== this.props.mode && editMode;
        if (newEntry || newMode) {
          this.props.fields.__setState(entry);
          // setTimeout(this.setFocus);
          return false;
        }
        return true;
      }
      onSubmit = e => {
        let { props } = this,
          data = this.props.fields.__submits.onSubmit(e);
        if (!data) return;
        let { mode, listName, entry } = props,
          list = props[listName],
          { name } = data,
          addMode = mode === 'pre_insert',
          editMode = mode === 'pre_update';
        // console.log('Form submit data', data, this.props);
        // if (editMode && name === entry.name) return;
        let id = slugify(name);
        if (addMode && findDuplicateByObj(list, { name, id })) {
          return Dialogs.message('The same entry already exists!');
        }
        data.id = id;
        if (editMode) data.__id = entry.id;
        props.setCommand({
          name: mode.slice(4), // remove 'pre_' prefix
          path: listName,
          entry: data,
        });
        return addMode ? props.fields.__resetState() : props.resetForm();
      };

      render() {
        // console.log('props from form helper', this.props);
        return (
          <Form
            onSubmit={this.onSubmit}
            propsTextInput={propsTextInput}
            {...this.props}
          />
        );
      }
    }
  );
