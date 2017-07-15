import React from 'react';

import { View, Text } from '../components';
import { mainCSS, sectionsCSS as styles } from '../styles';

export const renderItem = ({ item }) =>
  <View style={[styles.item, mainCSS.between]}>
    <View>
      <View>
        <Text style={mainCSS.subTitle}>
          {item.president}
        </Text>
      </View>
      {item.party &&
        <View style={mainCSS.row}>
          <Text style={styles.badge}>
            {item.party}
          </Text>
        </View>}
    </View>
    <View style={mainCSS.pullRightCol}>
      <View>
        <Text style={styles.aux}>Took office - left office</Text>
      </View>
      <View>
        <Text style={styles.extra}>
          {item.took_office} - {item.left_office}
        </Text>
      </View>
    </View>
  </View>;

export const renderSeparator = () => <View style={mainCSS.divider} />;

export const renderSectionSeparator = () => <View style={mainCSS.vgap20} />;

export const renderSectionHeader = ({ section }) =>
  <View style={styles.header}>
    <Text style={styles.title}>
      {section.key}
    </Text>
  </View>;
