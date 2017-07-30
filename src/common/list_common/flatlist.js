import React from 'react';

import { FlatList } from '../components';
import renderSet from '../list_common/elements';
import { mainCSS } from '../styles';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.set = renderSet(props.adapter);
  }

  render() {
    return (
      <FlatList
        contentContainerStyle={mainCSS.list}
        data={this.props.data}
        renderItem={this.set.renderRow}
        ItemSeparatorComponent={this.set.renderSeparator}
      />
    );
  }
}
