import React from 'react';
import { checkData } from '../__lib/utils';
import FormHelper from '../__components/FormHelper';
import Form from './Form';
import __toSections from './toSections';
import EditedList from '../__components/EditedList';
import { View, Text, TouchLink } from '../components';
import { colors, mainCSS, sectionsCSS as styles } from '../styles';

const toSections = ({ locations, ...props }) => {
  let { data, error } = checkData(locations, Form.model.fields);
  props.locations = data;
  let sections = __toSections(props);
  sections.error = error;
  return sections;
};

function renderSectionHeader({ section }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {section.name}
      </Text>
    </View>
  );
}

function renderItem({ item }) {
  // console.log('locations render row item', item);
  let { entry } = this.props;
  return (
    <TouchLink
      to={`/map/${item.id}`}
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

function isDataChanged({ categories, locations }) {
  return categories !== this.props.categories || locations !== this.props.locations;
}

function onListMount({ command, resetEntry }) {
  if (command && command.external) return;
  resetEntry();
}

export default EditedList({
  listName: 'locations',
  stateProps: ['categories', 'locations'],
  Form: FormHelper(Form),
  onListMount,
  renderSectionHeader,
  renderItem,
  isDataChanged,
  toSections,
});
