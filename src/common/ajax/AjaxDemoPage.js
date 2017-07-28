import React from 'react';
import { connect } from 'react-redux';
import { setCommand } from '../app/actions';

import { View, Form, TextInput, IconButton, FlatList, FormWrapper } from '../components';
import { renderPresident, renderSeparator } from '../list_common/elements';
import { colors, mainCSS } from '../styles';
import os from '../os';

const textInputProps = {
  keyboardType: 'default',
  returnKeyType: 'done',
  autoCapitalize: 'sentences',
  style: mainCSS.input,
};

export default connect(({ presidents }) => ({ presidents }), {
  setCommand,
})(
  FormWrapper({ fields: { fn: 'query', af: true } })(
    class extends React.Component {
      onSubmit = data => {
        console.log('submit data', data);
      };

      render() {
        let { presidents, setCommand, onSubmit, fields } = this.props;
        let { messages: T } = os;
        return (
          <View>
            <Form style={[mainCSS.form, mainCSS.vgap20]}>
              <View style={mainCSS.formRow}>
                <TextInput
                  placeholder={T['placeholders.search']}
                  {...fields.query}
                  {...textInputProps}
                />
                <IconButton
                  name="io-search"
                  backgroundColor={colors.success}
                  onPress={onSubmit}
                  message={T['search']}
                />
              </View>
            </Form>
            <FlatList
              contentContainerStyle={mainCSS.list}
              data={presidents}
              renderItem={renderPresident}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        );
      }
    }
  )
);
