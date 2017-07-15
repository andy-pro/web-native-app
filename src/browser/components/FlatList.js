import React from 'react';

import { View } from './fela';

export default ({
  contentContainerStyle,
  columnWrapperStyle,
  data,
  renderItem,
  ItemSeparatorComponent,
  numColumns,
  keyExtractor = d => d.key,
}) => {
  let dl = data.length;
  return (
    <View style={contentContainerStyle}>
      <View style={columnWrapperStyle}>
        {data.map((item, j) =>
          <div key={keyExtractor(item, j)}>
            {renderItem({ item, index: j })}
            {j < dl - 1 && <ItemSeparatorComponent />}
          </div>
        )}
      </View>
    </View>
  );
};
