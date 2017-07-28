import React from 'react';
import { connect } from 'react-redux';
import { setCommand } from '../app/actions';

import { View, FlatList } from '../components';
import AutosuggestForm from './AutosuggestForm';
import Popup from '../__components/Popup';
import { renderPresident, renderSeparator } from '../list_common/elements';
import { mainCSS } from '../styles';

export default connect(({ presidents }) => ({ presidents }), {
  setCommand,
})(({ presidents, setCommand }) =>
  <Popup>
    <AutosuggestForm onSelect={setCommand} />
    <FlatList
      contentContainerStyle={mainCSS.list}
      data={presidents}
      renderItem={renderPresident}
      ItemSeparatorComponent={renderSeparator}
    />
  </Popup>
);
