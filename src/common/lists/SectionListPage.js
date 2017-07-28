import React from 'react';

import { SectionList } from '../components';
import renderSet from '../list_common/elements';
import { toPresident } from '../list_common/adapters';
import { presidentSplitter } from '../list_common/splitters';
import { mainCSS } from '../styles';
import initialState from '../initialState';

const set = renderSet(toPresident);

export default () =>
  <SectionList
    contentContainerStyle={mainCSS.list}
    sections={presidentSplitter(initialState.presidents)}
    renderSectionHeader={set.renderSectionHeader}
    renderItem={set.renderRow}
    SectionSeparatorComponent={set.renderSectionSeparator}
    ItemSeparatorComponent={set.renderSeparator}
  />;
