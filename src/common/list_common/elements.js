import React from 'react';

import { View, Text, TouchLink } from '../components';
import { colors, mainCSS, sectionsCSS as styles } from '../styles';

export const renderSectionHeader = ({ section }) =>
  <View style={styles.header}>
    <Text style={styles.title}>
      {section.name}
    </Text>
  </View>;

/*  To access the members of the class, we must use the classical function -
    Function Declaration or Function Expression (not the arrow function).
*/
export function renderRow({ item }, __item) {
  // __item - original item (without adapter)
  let linkProps = {
    underlayColor: colors.touch,
    style: [styles.item],
  };
  if (this) {
    let { entry, urlParts } = this.props;
    if (entry && entry.id === item.id) {
      linkProps.style.push(mainCSS.active);
    }
    if (urlParts) {
      linkProps.to = `${urlParts[0]}/${item.id}`;
    }
    if (this.onItemLongPress) {
      linkProps.onLongPress = () => this.onItemLongPress(__item);
    }
  }
  return (
    <TouchLink {...linkProps}>
      <View style={mainCSS.between}>
        <View>
          <View>
            <Text style={mainCSS.subTitle}>
              {item.name}
            </Text>
          </View>
          {item.badge &&
            <View style={mainCSS.row}>
              <Text style={styles.badge}>
                {item.badge}
              </Text>
            </View>}
        </View>

        <View style={mainCSS.pullRightCol}>
          <View>
            <Text style={styles.aux}>
              {item.aux}
            </Text>
          </View>
          <View>
            <Text style={styles.extra}>
              {item.extra}
            </Text>
          </View>
        </View>
      </View>
    </TouchLink>
  );
}

export const renderSeparator = () => <View style={mainCSS.divider} />;

export const renderSectionSeparator = () => <View style={mainCSS.vgap20} />;

export default adapter => ({
  renderSectionHeader,
  renderSeparator,
  renderSectionSeparator,
  renderRow: function({ item }) {
    return renderRow.call(this, { item: adapter(item) }, item);
  },
});
