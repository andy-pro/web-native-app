import React from 'react';
import {
  Form as BaseForm,
  View,
  TextInput,
  Picker,
  IconButton,
  Link,
} from '../components';
import { removeSpecial } from '../__lib/utils';
import { inputSetDef, mainCSS } from '../styles';

const Form = props => {
  let { fields, mode, onSubmit, categories } = props,
    addMode = mode === 'pre_insert';
  return (
    <BaseForm style={[mainCSS.form, mainCSS.divider]} onSubmit={onSubmit}>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={addMode ? 'New entry' : 'Edit entry'}
          {...fields.name}
          {...inputSetDef}
        />
      </View>
      <View style={mainCSS.formRow}>
        <TextInput placeholder={'Address'} {...fields.address} {...inputSetDef} />
      </View>
      <View style={mainCSS.formRow}>
        <TextInput placeholder={'Coordinates'} {...fields.coords} {...inputSetDef} />
        <Link to={`https://andy-pro.github.io/myLocations/map/@${fields.coords.value}`}>
          <IconButton name="md-my-location" style={mainCSS.formBtn} title="Show on map" />
        </Link>
      </View>
      <View style={mainCSS.formRow}>
        <Picker {...fields.category} style={[mainCSS.picker, { flex: 3 }]}>
          {categories.map(item =>
            <Picker.Item label={item.name} value={item.id} key={item.id} />
          )}
        </Picker>
        <TextInput placeholder={'Zoom'} {...fields.zoom} {...inputSetDef} />
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

Form.model = {
  fields: [
    { fn: 'name', vd: 'required', pp: removeSpecial, af: true },
    { fn: 'address', vd: 'required', pp: removeSpecial },
    { fn: 'category', type: 'picker' },
    { fn: 'coords', vd: 'isCoords', pp: removeSpecial },
    { fn: 'zoom' },
  ],
};

// Form.onFormMount = onFormMount;

export default Form;
