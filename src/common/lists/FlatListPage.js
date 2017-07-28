import React from 'react';

import { FlatList } from '../components';
import renderSet from '../list_common/elements';
import { toPresident } from '../list_common/adapters';
import { mainCSS } from '../styles';
import initialState from '../initialState';

const { renderRow, renderSeparator } = renderSet(toPresident);

export default () =>
  <FlatList
    contentContainerStyle={mainCSS.list}
    data={initialState.presidents}
    renderItem={renderRow}
    ItemSeparatorComponent={renderSeparator}
  />;
