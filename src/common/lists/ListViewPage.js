import React from 'react';

import { ListView } from '../components';
import renderSet from '../list_common/elements';
import { toPresident } from '../list_common/adapters';
import { mainCSS } from '../styles';
import initialState from '../initialState';

const { renderRow, renderSeparator } = renderSet(toPresident);

export default class extends React.Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(initialState.presidents);
  }

  render() {
    return (
      <ListView
        contentContainerStyle={mainCSS.list}
        dataSource={this.dataSource}
        renderRow={item => renderRow({ item })}
        renderSeparator={renderSeparator}
      />
    );
  }
}
