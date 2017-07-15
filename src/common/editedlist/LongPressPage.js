import React from 'react';
import { connect } from 'react-redux';

import { setEntry } from '../app/actions';
import { SectionList } from '../components';
import {
  renderItem,
  renderSeparator,
  renderSectionHeader,
  renderSectionSeparator,
} from './elements';
import { mainCSS } from '../styles';
import data from '../__data';
import toSections from './toSections';

const listName = 'locations';

export default connect(({ app }) => ({ entry: app.entry }), { setEntry })(
  class extends React.Component {
    onItemLongPress = entry =>
      this.props.setEntry({
        listName,
        entry,
      });
    render() {
      return (
        <SectionList
          contentContainerStyle={mainCSS.list}
          sections={toSections(data)}
          renderSectionHeader={renderSectionHeader.bind(this)}
          renderItem={renderItem.bind(this)}
          SectionSeparatorComponent={renderSectionSeparator}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={item => item.id}
        />
      );
    }
  }
);
