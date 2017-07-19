import React from 'react';

import { View, Text, TouchLink } from '../components';
import { colors, mainCSS, sectionsCSS as styles } from '../styles';

export function renderItem({ item }) {
  // console.log('locations render row item', item);
  let { entry } = this.props;
  return (
    <TouchLink
      to={`/longpress/${item.id}`}
      underlayColor={colors.touch}
      style={[styles.item, entry && entry.id === item.id && mainCSS.active]}
      onLongPress={() => this.onItemLongPress(item)}
    >
      <View style={mainCSS.between}>
        <View>
          <View>
            <Text style={mainCSS.subTitle}>
              {item.name}
            </Text>
          </View>
          <View style={mainCSS.row}>
            <Text style={styles.badge}>
              {item.address}
            </Text>
          </View>
        </View>

        <View style={mainCSS.pullRightCol}>
          <View>
            <Text style={styles.aux}>Coordinates</Text>
          </View>
          <View>
            <Text style={styles.extra}>
              {item.coords}
            </Text>
          </View>
        </View>
      </View>
    </TouchLink>
  );
}

export const renderSeparator = () => <View style={mainCSS.divider} />;

export const renderSectionSeparator = () => <View style={mainCSS.vgap20} />;

export function renderSectionHeader({ section }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {section.name}
      </Text>
    </View>
  );
}
