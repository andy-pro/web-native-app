import React from 'react';
import { Text, View } from '../components';
import { colors, mainCSS } from '../styles';

export default () =>
  <View style={[mainCSS.vgap20, { backgroundColor: colors.light, padding: 20 }]}>
    <Text style={{ fontSize: 14, color: colors.dark }}>
      <Text style={{ fontWeight: '600' }}>Purpose of the wrapper:</Text>
      <Text style={{ fontSize: 12, whiteSpace: 'pre' }}>
        {`\n
- storage of form state inside the wrapper
- all elements of the form are made controllable
- initial setting of fields
- validation of field values
- focusing on the desired field when mounting the form
- focusing on the field when a validation error occurs
- set field values
- reset field values
- creating a FormData object on form submit event
`}
      </Text>
    </Text>
  </View>;
