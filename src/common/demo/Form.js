import React from 'react';
import {
  Form,
  Text,
  View,
  Link,
  TextInput,
  FileInput,
  Checkbox,
  Picker,
  IconButton,
} from '../components';
import { colors, inputSetDef, mainCSS } from '../styles';
import initialState from '../initialState';

const onSubmit = e => {
  e.preventDefault();
  console.log('Form submit');
};

const Divider = () => <View style={[mainCSS.divider, { marginVertical: 10 }]} />;

const FormDemo = () =>
  <Form style={[mainCSS.form, colors.border, { width: '100%' }]} onSubmit={onSubmit}>
    <Text>Form</Text>
    <Divider />

    <Text style={mainCSS.prompt}>TextInput</Text>
    <View style={mainCSS.formRow}>
      <TextInput placeholder="New entry" {...inputSetDef} />
    </View>

    <Divider />

    <View style={mainCSS.formRow}>
      <Text style={mainCSS.prompt}>
        Checkboxes are implemented as stateless. See the
        <Link to="/formwrapper" message="FormWrapper" inline />
        component.
      </Text>
    </View>
    <View style={mainCSS.formRow}>
      <Checkbox label="Visited" />
      <Checkbox label="Favorite" checked />
    </View>

    <Divider />

    <Text style={mainCSS.prompt}>Picker</Text>
    <View style={mainCSS.formRow}>
      <Picker style={[mainCSS.picker, { flex: 3 }]}>
        {initialState.continents.map((item, i) =>
          <Picker.Item label={item} value={i} key={i} />
        )}
      </Picker>
    </View>

    <Divider />

    <Text style={mainCSS.prompt}>
      FileInput, full-functionality see at the
      <Link to="/backup" message="Import - Export" inline /> example.
    </Text>
    <View style={mainCSS.formRow}>
      <FileInput placeholder="Select file" {...inputSetDef} />
    </View>

    <Divider />

    <View style={mainCSS.pullRightRow}>
      <IconButton
        name="io-paper-airplane"
        onPress={onSubmit}
        style={mainCSS.formBtn}
        title="Submit"
        message="Submit"
        backgroundColor={colors.success}
      />
    </View>
  </Form>;

export default FormDemo;
