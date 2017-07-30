import React from 'react';

import {
  Text,
  View,
  Link,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchLink,
  ScrollView,
  Icon,
  IconButton,
  IconLink,
  Button,
  Alert,
  Svg,
  Circle,
  Rect,
  SvgText,
  // Form, TextInput, Picker, FileInput,
} from '../components';
import { colors, mainCSS } from '../styles';
import FormDemo from './Form';
import img from '../__components/img/react-tools.jpg';
import __data from '../__data';

const onPress = e => console.log('onPress event', e);
const onLongPress = e => console.log('onLongPress event', e);
const makeChoice = () => {
  // prettier-ignore
  Alert.alert(
    'Make a choice',
    'To be or not to be?',
    [
      { text: 'Cancel', onPress: () => console.log('Not to be.'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('To be.') },
    ],
    { cancelable: false }
  );
};
const Title = ({ text }) =>
  <Text style={{ fontStyle: 'italic' }}>
    {text}
  </Text>;
const Extra = ({ text }) =>
  <Text style={{ fontWeight: 'bold' }}>
    {text}
  </Text>;

export default ({ history, layout }) => {
  let border = { borderWidth: 1, borderColor: '#ddd', margin: 15, padding: 10 },
    Gap = () => <View style={{ margin: 5 }} />;
  return (
    <ScrollView>
      <View style={[mainCSS.fullMain, { alignItems: 'center' }]}>
        <Text style={mainCSS.title}>Text</Text>

        <View style={{ backgroundColor: colors.submain, padding: 20 }}>
          <Text style={mainCSS.title}>View</Text>
        </View>

        <View style={[border, mainCSS.fullMain, mainCSS.center]}>
          <Title text="Buttons" />
          <Gap />
          <Button title="Button" color={colors.submain} onPress={onPress} />
          <Gap />
          <IconButton name="io-search" message="Print to console" onPress={onPress} />
          <Gap />
          <Link to="https://andy-pro.github.io/myLocations">
            <IconButton
              name="go-globe"
              message="link to myLocations"
              backgroundColor={colors.success}
            />
          </Link>
          <Gap />
        </View>

        <View style={border}>
          <Title text="External link" />
          <Gap />
          <View>
            <Link
              to="https://andy-pro.github.io/icon-viewer"
              message="Icon Viewer"
              inline
            />
          </View>
        </View>

        <TouchableHighlight
          underlayColor={colors.alarm}
          style={border}
          onPress={makeChoice}
        >
          <Text>Alert</Text>
        </TouchableHighlight>

        <View style={border}>
          <Text style={{ fontStyle: 'italic' }}>Image</Text>
          <Image source={img} style={{ maxWidth: '100%', height: 'auto' }} />
        </View>

        <TouchableHighlight
          underlayColor="#ddf"
          style={border}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <Text>TouchableHighlight</Text>
        </TouchableHighlight>

        <TouchableOpacity
          activeOpacity={0.4}
          style={border}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <Text style={{ fontWeight: 600 }}>TouchableOpacity</Text>
        </TouchableOpacity>

        <TouchLink underlayColor="#ddf" style={border} to="/" onLongPress={onLongPress}>
          <Text>Touch to "Home"</Text>
        </TouchLink>

        <View style={border}>
          <Text style={{ fontStyle: 'italic' }}>Icons</Text>
          <Gap />
          <View style={mainCSS.row}>
            <Icon name="md-home" color={colors.main} title="Home" />
            <Icon name="md-menu" color={colors.main} title="Menu" />
            <Icon name="md-add-circle" color={colors.main} title="Add" />
            <Icon name="md-remove-circle" color={colors.alarm} title="Delete" />
            <Icon name="md-edit" color={colors.success} title="Edit" />
          </View>
          <Gap />
          <Text style={{ fontStyle: 'italic' }}>IconLink</Text>
          <Gap />
          <IconLink
            name="go-list-unordered"
            message="SectionList"
            to="/sectionlist"
            color={colors.main}
          />
        </View>

        <FormDemo />

        <View style={border}>
          <Title text="EditedList" />
          <Gap />
          <Text>
            <Link to="/editedlist" message="EditedList" inline /> - High Order Component,
            that helps you organize standard operations on items of collections, such as{' '}
            <Extra text="insert" />, <Extra text="update" /> and <Extra text="remove" />.
            Works in conjunction with Redux, FormWrapper and has a declarative interface.
            Editing mode is available after a <Extra text="long press" /> on item.{' '}
          </Text>
        </View>

        <View style={border}>
          <Title text="ScrollView" />
          <ScrollView style={[border, { height: 140 }]}>
            <Text>
              {`${__data.lorem} ${__data.ipsum}`}
            </Text>
          </ScrollView>
        </View>

        <View style={border}>
          <Title text="SVG" />
        </View>
        <Svg height="100" width="100">
          <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
          <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg>

        <Svg height="100" width="340">
          <SvgText
            fill="none"
            stroke="purple"
            fontSize="40"
            fontWeight="bold"
            x="170"
            y="50"
            textAnchor="middle"
          >
            STROKED TEXT
          </SvgText>
        </Svg>
      </View>
    </ScrollView>
  );
};
