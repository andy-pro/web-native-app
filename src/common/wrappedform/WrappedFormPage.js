import React from 'react';

import { View, FormWrapper, Alert } from '../components';
import Form from './Form';
import InfoWrapper from './InfoWrapper';

/* Here is an example of how the functionality of the current
   form component can be extended. It should be noted that 
   functional components does not have "ref" property,
   so the wrapped form must be a "class" */

class FormWithInfo extends React.Component {
  onSubmit = (data, fields) => {
    if (!data) return;
    Alert.alert('FormData', JSON.stringify(data, null, 4));
    fields.__resetState();
  };

  render() {
    return (
      <View>
        <Form {...this.props} />
        <InfoWrapper />
      </View>
    );
  }
}

export default FormWrapper(Form.Model)(FormWithInfo);
