import React from 'react';

import { ListView } from '../components';
import { renderItem, renderSeparator } from './elements';
import { mainCSS } from '../styles';
import presidents from '../__data/presidents';

export default class extends React.Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(presidents),
    };
  }

  render() {
    return (
      <ListView
        contentContainerStyle={mainCSS.list}
        dataSource={this.state.dataSource}
        renderRow={item => renderItem({ item })}
        renderSeparator={renderSeparator}
      />
    );
  }
}
