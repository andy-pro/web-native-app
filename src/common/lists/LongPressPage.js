import React from 'react';
import { connect } from 'react-redux';

import { setEntry } from '../app/actions';
import { SectionList } from '../components';
import renderSet from '../list_common/elements';
import { toLocation } from '../list_common/adapters';
import { locationSplitter } from '../list_common/splitters';
import { mainCSS } from '../styles';
import initialState from '../initialState';

const set = renderSet(toLocation);

export default connect(({ app }) => ({ entry: app.entry }), { setEntry })(
  class extends React.Component {
    onItemLongPress = entry =>
      this.props.setEntry({
        listName: 'locations',
        entry,
      });

    /* if renderSet methods needs access to the elements of the
       class (as onItemLongPress in this example), then you need
       to pass the context using 'bind(this)'
    */
    render() {
      return (
        <SectionList
          contentContainerStyle={mainCSS.list}
          sections={locationSplitter(initialState)}
          renderSectionHeader={set.renderSectionHeader}
          renderItem={set.renderRow.bind(this)}
          SectionSeparatorComponent={set.renderSectionSeparator}
          ItemSeparatorComponent={set.renderSeparator}
          keyExtractor={item => item.id}
        />
      );
    }
  }
);
