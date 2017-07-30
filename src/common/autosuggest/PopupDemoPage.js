import React from 'react';
import { connect } from 'react-redux';
import { setCommand } from '../app/actions';

import FlatList from '../list_common/flatlist';
import { toPresident } from '../list_common/adapters';
import AutosuggestForm from './AutosuggestForm';
import Popup from '../__components/Popup';

/* Wrap our page with a Popup component. This is done so that the popup
   window is the last in the component queue and not using the zIndex,
   because it is known that the zIndex is quite a buggy thing under Android. */

export default connect(({ presidents }) => ({ presidents }), {
  setCommand,
})(({ presidents, setCommand }) =>
  <Popup>
    <AutosuggestForm onSelect={setCommand} />
    <FlatList adapter={toPresident} data={presidents} />
  </Popup>
);
