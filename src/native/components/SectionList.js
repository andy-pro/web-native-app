import React from 'react';
import { ScrollView, View } from 'react-native';

export default ({
  style,
  sections,
  renderSectionHeader,
  renderItem,
  keyExtractor = d => d.key,
}) =>
  <ScrollView>
    {sections.map((section, i) =>
      <View key={keyExtractor(section, i)}>
        {renderSectionHeader({ section })}
        {section.data.map((item, j) =>
          <View key={keyExtractor(item, j)}>
            {renderItem({ item, index: j })}
          </View>
        )}
      </View>
    )}
  </ScrollView>;

/*

  <SectionList
    sections={sections}
    renderSectionHeader={renderSectionHeader}
    renderItem={renderItem}
    keyExtractor={item => item.id}
  />

*/
