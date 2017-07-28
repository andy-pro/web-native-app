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

    /* если из подпрограмм рендеринга (renderSet) нужен доступ
       к элементам класса (как onItemLongPress в этом примере),
       то необходимо передавать контекст с помощью bind(this)
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
