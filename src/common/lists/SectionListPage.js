import React from 'react';

import { SectionList } from '../components';
import {
  renderItem,
  renderSeparator,
  renderSectionHeader,
  renderSectionSeparator,
} from './elements';
import { mainCSS } from '../styles';
import presidents from '../__data/presidents';
import toSections from './toSections';

export default class extends React.Component {
  render() {
    return (
      <SectionList
        contentContainerStyle={mainCSS.list}
        sections={toSections(presidents)}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        SectionSeparatorComponent={renderSectionSeparator}
        ItemSeparatorComponent={renderSeparator}
      />
    );
  }
}
