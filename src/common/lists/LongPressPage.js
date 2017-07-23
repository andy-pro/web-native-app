import React from 'react';
import { connect } from 'react-redux';

import { setEntry } from '../app/actions';
import { SectionList } from '../components';
import {
  renderItem,
  renderSeparator,
  renderSectionHeader,
  renderSectionSeparator,
} from '../list_common/elements';
import toSections from '../list_common/toSections';
import { mainCSS } from '../styles';
import initialState from '../initialState';

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
          sections={toSections(initialState)}
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
