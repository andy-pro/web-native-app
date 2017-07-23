import React from 'react';
import { Form as BaseForm, View, TextInput, Picker, IconButton } from '../components';
import { removeSpecial } from '../__lib/utils';
import validator from '../__lib/validator';
import { mainCSS } from '../styles';

const coordsToUrl = ({ coords, zoom }) => {
  coords = coords.value;
  zoom = zoom.value;
  let url = '/map';
  if (validator.isCoords(coords)) {
    url += `/@${coords.replace(/\s/g, '')}`;
    if (validator.isDecimal(zoom)) {
      url += `,${zoom}z`;
    }
  }
  return url;
};

const cmdCoordsToMap = ({ fields, mode, setCommand, command, history }) => {
  setCommand(Object.assign(command, { path: '/map', external: true }));
  setTimeout(() => history.push(coordsToUrl(fields)), 0);
};

const onFormMount = ({ command, mode, entry, fields }) => {
  if (command) {
    let { path, isForm, external } = command;
    if (external && isForm && path === '/map') {
      let { region } = entry;
      fields.__setState({
        coords: `${region.latitude.toPrecision(7)}, ${region.longitude.toPrecision(7)}`,
        zoom: region.zoom,
      });
    }
  }
};

const Form = props => {
  let { fields, mode, onSubmit, propsTextInput, categories } = props,
    addMode = mode === 'pre_insert';
  // console.log('locations form', fields, mode, categories);
  return (
    <BaseForm style={[mainCSS.form, mainCSS.divider]} onSubmit={onSubmit}>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={addMode ? 'New entry' : 'Edit entry'}
          style={mainCSS.input}
          {...fields.name}
          {...propsTextInput}
        />
      </View>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={'Address'}
          style={mainCSS.input}
          {...fields.address}
          {...propsTextInput}
        />
      </View>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={'Coordinates'}
          style={mainCSS.input}
          {...fields.coords}
          {...propsTextInput}
        />
        <IconButton
          name="md-my-location"
          style={mainCSS.formBtn}
          onPress={() => cmdCoordsToMap(props)}
          title="Show on map"
        />
      </View>
      <View style={mainCSS.formRow}>
        <Picker {...fields.category} style={[mainCSS.picker, { flex: 3 }]}>
          {categories.map(item =>
            <Picker.Item label={item.name} value={item.id} key={item.id} />
          )}
        </Picker>
        <TextInput
          placeholder={'Zoom'}
          style={mainCSS.input}
          {...fields.zoom}
          {...propsTextInput}
          title="Save changes"
        />
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
  submit: 'onSubmit',
  fields: [
    { fn: 'name', vd: 'required', pp: removeSpecial, af: true },
    { fn: 'address', vd: 'required', pp: removeSpecial },
    { fn: 'category', type: 'picker' },
    { fn: 'coords', vd: 'isCoords', pp: removeSpecial },
    { fn: 'zoom' },
  ],
};

Form.onFormMount = onFormMount;

export default Form;
