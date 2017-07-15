import React from 'react';

import { FlatList } from '../components';
import { renderItem, renderSeparator } from './elements';
import { mainCSS } from '../styles';
import presidents from '../__data/presidents';

export default class extends React.Component {
  render() {
    return (
      <FlatList
        contentContainerStyle={mainCSS.list}
        data={presidents}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    );
  }
}
