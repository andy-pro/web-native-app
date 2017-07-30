import React from 'react';
import { connect } from 'react-redux';
import { replaceUsers } from '../app/actions';

import {
  View,
  Text,
  Form,
  Image,
  Link,
  TextInput,
  IconButton,
  FlatList,
  FormWrapper,
} from '../components';
import { renderSeparator } from '../list_common/elements';
import { inputSetDef, colors, mainCSS, sectionsCSS as styles } from '../styles';
import os from '../os';

const renderUser = ({ item }) =>
  <View style={[mainCSS.row, styles.item]}>
    <Image source={item.avatar_url} style={{ width: 60, height: 60 }} />
    <View style={{ margin: 10 }}>
      <Link to={item.html_url} message={item.login} />
      <View>
        <Text style={styles.aux}>Score: </Text>
        <Text style={styles.extra}>
          {item.score}
        </Text>
      </View>
    </View>
  </View>;

export default connect(({ users }) => ({ users }), {
  replaceUsers,
})(
  FormWrapper({ fields: { fn: 'query', af: true } })(
    class extends React.Component {
      onSubmit = ({ query }) => {
        this.props.replaceUsers(query);
      };

      render() {
        let { users, onSubmit, fields } = this.props;
        let { messages: T } = os;
        return (
          <View style={mainCSS.fullMain}>
            <Form style={[mainCSS.form, mainCSS.vgap20]} onSubmit={onSubmit}>
              <View style={mainCSS.formRow}>
                <TextInput
                  placeholder={T['placeholders.search']}
                  {...fields.query}
                  {...inputSetDef}
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
              data={users}
              keyExtractor={item => item.id}
              renderItem={renderUser}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        );
      }
    }
  )
);
