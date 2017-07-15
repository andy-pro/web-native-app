import React from 'react';

import { View } from './fela';

export default ({
  contentContainerStyle,
  sections,
  renderSectionHeader,
  renderItem,
  ItemSeparatorComponent,
  SectionSeparatorComponent,
  keyExtractor = d => d.key,
}) => {
  let sl = sections.length;
  return (
    <View style={contentContainerStyle}>
      {sections.map((section, i) => {
        let data = section.data,
          dl = data.length;
        return (
          <div key={keyExtractor(section, i)}>
            {renderSectionHeader({ section })}
            {section.data.map((item, j) =>
              <div key={keyExtractor(item, j)}>
                {renderItem({ item, index: j })}
                {j < dl - 1 && <ItemSeparatorComponent />}
              </div>
            )}
            {i < sl - 1 && <SectionSeparatorComponent />}
          </div>
        );
      })}
    </View>
  );
};
