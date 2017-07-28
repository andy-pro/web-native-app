import React from 'react';
import {
  Form as BaseForm,
  View,
  TextInput,
  Checkbox,
  Picker,
  IconButton,
} from '../components';
import { removeSpecial } from '../__lib/utils';
import { mainCSS } from '../styles';
import initialState from '../initialState';

const textInputProps = {
  keyboardType: 'default',
  returnKeyType: 'done',
  autoCapitalize: 'sentences',
  style: mainCSS.input,
};

const Form = props => {
  let { fields, mode, onSubmit } = props,
    addMode = mode !== 'pre_update';
  return (
    <BaseForm style={[mainCSS.form, mainCSS.vgap20]} onSubmit={onSubmit}>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={addMode ? 'New entry' : 'Edit entry'}
          {...fields.name}
          {...textInputProps}
        />
      </View>
      <View style={mainCSS.formRow}>
        <TextInput placeholder={'Address'} {...fields.address} {...textInputProps} />
      </View>

      <View style={mainCSS.formRow}>
        <Checkbox label="Visited" {...fields.visited} />
        <Checkbox label="Favorite" {...fields.favorite} />
        <Checkbox label="Disabled" disabled />
      </View>
      <View style={mainCSS.formRow}>
        <TextInput placeholder={'Coordinates'} {...fields.coords} {...textInputProps} />
        <IconButton name="md-my-location" style={mainCSS.formBtn} title="Show on map" />
      </View>
      <View style={mainCSS.formRow}>
        <Picker {...fields.category} style={[mainCSS.picker, { flex: 3 }]}>
          {initialState.continents.map((item, i) =>
            <Picker.Item label={item} value={i} key={i} />
          )}
        </Picker>
        <TextInput placeholder={'Zoom'} {...fields.zoom} {...textInputProps} />
        <IconButton
          name={addMode ? 'md-add-circle' : 'md-edit'}
          onPress={onSubmit}
          style={mainCSS.formBtn}
          title="Save"
        />
      </View>
    </BaseForm>
  );
};

/*
  Model: {
    submit: String, // submit handler name, 'onSubmit' by default,
    fields: Array, // array of field objects
  }
  If there are more than one form on the page, then an array of models used:
  [
    { submit: onInsertSubmit, fields: [{...}, {...}] },
    { submit: onRemoveSubmit, fields: [{...}, {...}] },
    { submit: onUpdateSubmit, fields: [{...}, {...}] },
    ...
  ]

  !!! Field names on a page must be unique !!!

  If the form has only one field, you can do so:
  { submit: 'onFormSubmit', fields: {...} }

  field:
    { fn: fieldName, type: [text(default), checkbox, picker, file],
      vd: validator, init: initialValue, af: autoFocus, pp: postProcessing }

  Methods:
    __resetState(index),
       index - index of form on page to reset, if 'all' - all forms will be resetted, default - 0
    __setState(object of fields)
*/

Form.Model = {
  submit: 'onSubmit', // this can be omitted, 'onSubmit' by default
  fields: [
    { fn: 'name', vd: 'required', pp: removeSpecial, af: true },
    { fn: 'address', vd: 'required', pp: removeSpecial },
    { fn: 'visited', type: 'checkbox' },
    { fn: 'favorite', type: 'checkbox', init: true },
    { fn: 'category', type: 'picker', init: 5 },
    { fn: 'coords', vd: 'isCoords', pp: removeSpecial },
    { fn: 'zoom', vd: 'isDecimal' },
  ],
};

// Form.onFormMount = onFormMount;

export default Form;
