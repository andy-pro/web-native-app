import React from 'react';

import { FlatList } from '../components';
import { renderItem, renderSeparator } from './elements';
import { mainCSS } from '../styles';
import initialState from '../initialState';

export default class extends React.Component {
  render() {
    return (
      <FlatList
        contentContainerStyle={mainCSS.list}
        data={initialState.presidents}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    );
  }
}
