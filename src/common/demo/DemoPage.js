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
          <Text style={{ fontStyle: 'italic' }}>Buttons</Text>
          <Gap />
          <Button title="Button" color={colors.submain} onPress={onPress} />
          <Gap />
          <IconButton name="io-search" message="IconButton" onPress={onPress} />
          <Gap />
        </View>

        <View style={border}>
          <Text style={{ fontStyle: 'italic' }}>External link</Text>
          <Link to="https://google.com" message="Google" inline />
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
          <Text style={{ fontStyle: 'italic' }}>ScrollView</Text>
          <ScrollView style={[border, { height: 140 }]}>
            <Text>
              Velit laborum aliquip voluptate incididunt dolore qui proident velit
              adipisicing. Pariatur sint fugiat aute eiusmod aute aliquip dolor culpa enim
              quis. Ea elit ad duis cillum et aliquip. Elit aliquip enim ut quis tempor.
              Veniam irure minim esse proident culpa Lorem duis veniam dolor anim quis
              laboris id laboris. Enim minim eiusmod labore do consectetur voluptate
              pariatur cillum fugiat dolore magna incididunt. Qui eiusmod Lorem qui irure
              consequat. Consectetur velit officia eiusmod esse labore sint anim nostrud
              elit nulla dolore dolor. In aute ad incididunt pariatur cupidatat do
              deserunt irure. Exercitation cillum enim incididunt amet Lorem ut Lorem
              nulla.
            </Text>
          </ScrollView>
        </View>

        <View style={border}>
          <Text style={{ fontStyle: 'italic' }}>SVG</Text>
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
