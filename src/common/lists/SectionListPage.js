import React from 'react';

import { SectionList } from '../components';
import {
  renderItem,
  renderSeparator,
  renderSectionHeader,
  renderSectionSeparator,
} from './elements';
import { mainCSS } from '../styles';
import toSections from './toSections';
import initialState from '../initialState';

export default class extends React.Component {
  render() {
    return (
      <SectionList
        contentContainerStyle={mainCSS.list}
        sections={toSections(initialState.presidents)}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        SectionSeparatorComponent={renderSectionSeparator}
        ItemSeparatorComponent={renderSeparator}
      />
    );
  }
}
