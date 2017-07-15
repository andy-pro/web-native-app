import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

export default class FlexDirectionBasics extends Component {
  render() {
    let full = true;
    full = false;
    return (
      <View style={mainCSS.app}>
        <View style={mainCSS.root}>
          <Header />
          <View style={[mainCSS.subRoot, mainCSS.limited]}>
            <MapPage />
          </View>

          <View style={mainCSS.fixedBottom}>
            <View style={[mainCSS.fullWidth, mainCSS.limited]}>
              <View style={mainCSS.fullWidth}>
                <RoundButton />
              </View>
            </View>
          </View>

          {!full && <Footer />}
        </View>
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => FlexDirectionBasics);

const MapPage = () => {
  return (
    <View style={mainCSS.mapRoot}>
      <View style={[mainCSS.mapMain, { backgroundColor: '#fec' }]} />
      <BackButton />
    </View>
  );
};

const BackButton = () => <IconButton style={mainCSS.backBtn} />;

const Header = props => {
  return (
    <View style={headerCSS.root}>
      <View style={[mainCSS.full, mainCSS.limited]}>
        <Text style={headerCSS.title}>Title</Text>
        <ToolBar />
      </View>
    </View>
  );
};

const ToolBar = () => {
  return (
    <View style={mainCSS.between}>
      <View style={mainCSS.centerRow}>
        <IconButton />
        <Text style={[mainCSS.subTitle, { color: colors.light }, { width: 70 }]}>
          'subTitle'
        </Text>
      </View>

      <View style={mainCSS.centerRow}>
        <IconButton />
        <IconButton />
        <IconButton />
        <IconButton />
      </View>
    </View>
  );
};

const Icon = ({ style }) => {
  style = style || {
    width: 24,
    height: 24,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'steelblue',
  };
  return <View style={style} />;
};

const IconButtonBase = ({
  message,
  children,
  size = 17,
  color = iconColors.main,
  name,
}) => {
  message = message || children;
  return (
    <View style={mainCSS.centerRow}>
      <Icon size={size * 1.65} color={color} name={name} />
      {message &&
        <Text
          style={{
            fontSize: size,
            color,
            fontWeight: '600',
            paddingHorizontal: 3,
          }}
        >
          {message}
        </Text>}
    </View>
  );
};

const IconButton = ({ style, backgroundColor = iconColors.bgMain, onPress, ...props }) =>
  <TouchableOpacity
    style={[mainCSS.button, { backgroundColor, borderColor: backgroundColor }, style]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <IconButtonBase {...props} />
  </TouchableOpacity>;

const IconLink = ({ message }) => {
  return (
    <TouchableOpacity>
      <View style={mainCSS.centerRow}>
        <IconButton />
        <Text
          style={{
            fontSize: 15,
            color: 'white',
            fontWeight: '600',
            paddingHorizontal: 3,
          }}
        >
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Footer = () => {
  return (
    <View style={[mainCSS.footer, mainCSS.centerRow]}>
      <IconLink to="/categories" message="Categories" name="go-list-unordered" />
      <IconLink to="/locations" message="Locations" name="go-globe" />
    </View>
  );
};

const RoundButton = () => {
  return (
    <TouchableHighlight style={roundBtnCSS.button} underlayColor={colors.mainTouch}>
      <Text style={roundBtnCSS.text}>+</Text>
    </TouchableHighlight>
  );
};

const _main_ = '#477';

const opts = {
  fontFamily: 'Arial, sans-serif',
  gaps: 15,
  headerH: 66,
  footerH: 44,
  fontSize: 15,
  maxWidth: 450,
};

const colors = {
  background: 'white',
  main: _main_,
  header: _main_,
  footer: _main_,
  menu: 'white',
  submain: '#e0f0d8',
  success: '#cdd',
  drawer: '#333',
  mainTouch: '#688',
  touch: '#eee',
  menuTouch: '#555',
  active: '#fec',
  disabled: '#555',
  alarm: '#d66',
  // primary: '#18a06a',
  primary: _main_,
  dark: '#555',
  light: '#ddd',
  highlight: '#fff',
  silver: '#ccc',
  border: {
    borderColor: '#ccc',
    borderWidth: 1,
  },
};

const mainCSS = StyleSheet.create({
  app: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  subRoot: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    // backgroundColor: colors.background,
  },
  full: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    // backgroundColor: colors.background,
  },
  fullWidth: { width: '100%' },
  limited: {
    // flex: 1,
    maxWidth: opts.maxWidth,
    // width: '100%',
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'yellow',
    // justifyContent: 'space-between',
  },
  main: {
    flex: 1,
  },
  list: {
    // overflow: 'auto',
  },
  fullWindow: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },

  text: {
    fontSize: opts.fontSize,
    color: colors.dark,
  },
  subTitle: {
    fontSize: opts.fontSize,
    fontWeight: '600',
    // color: colors.light,
    // lineHeight: opts.fontSize + 'px',
    // flexWrap: 'wrap',
  },

  divider: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
  },

  row: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // align-items: flex-start | flex-end | center | baseline | stretch (default)
    // alignItems: 'flex-start',
    // alignItems: 'center',
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  between: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  pullRightRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pullRightCol: {
    alignItems: 'flex-end',
  },
  active: {
    backgroundColor: colors.active,
  },

  /* form styles */
  form: {
    paddingVertical: 6,
    paddingHorizontal: opts.gaps,
    backgroundColor: colors.active,
  },
  formRow: {
    flexDirection: 'row',
  },
  formBtn: {
    marginBottom: 3,
  },
  input: {
    flex: 1,
    fontSize: opts.fontSize,
    paddingHorizontal: 8,
    paddingVertical: 1,
    // marginTop: 4,
  },
  picker: {
    flex: 1,
    // flexDirection: 'row',
    // paddingHorizontal: 8,
    // paddingLeft: -5,
    // margin: 0,
    height: 35,
    marginTop: 6,
    // lineHeight: 1,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 12,
    width: 80,
    justifyContent: 'center',
  },

  /* links */
  h_link: {
    marginHorizontal: 20,
    paddingHorizontal: 15,
    fontSize: opts.fontSize * 1.3,
    color: '#559',
    textDecorationLine: 'underline',
    // backgroundColor: '#ffa',
  },
  a_link: {
    padding: 6,
  },

  /* footer */
  footer: {
    // display: 'flex',
    backgroundColor: colors.footer,
    // bottom: 0,
    // position: 'fixed',
    width: '100%',
    height: opts.footerH,
  },
  fixedBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  f_link: {
    color: colors.light,
    fontSize: opts.fontSize * 0.8,
  },
});

mainCSS.mapRoot = mainCSS.mapMain = mainCSS.main;

const headerCSS = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: colors.header,
    // paddingHorizontal: opts.gaps,
    height: opts.headerH,
    alignItems: 'center',
    // zIndex: 2, // !!! ломает отображение даже с отключенным хидером !!!
  },
  title: {
    color: colors.light,
    fontSize: opts.fontSize * 1.4,
    // lineHeight: '1',
    marginBottom: -3,
    textAlign: 'center',
  },
});

const roundBtnCSS = StyleSheet.create({
  button: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: colors.header,
    width: 60,
    height: 60,
    borderRadius: 30,
    // paddingTop: 1,
    opacity: 0.7,
    // zIndex: 2,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
    // textShadowColor: 'black',
  },
});

const iconColors = {
  // main: colors.light,
  main: '#fff',
  inverse: colors.dark,
  primary: '#522',
  active: colors.highlight,
  disabled: '#888',
  bgMain: colors.main,
  // bgMain: 'red',
  bgActive: colors.main,
  // bgActive: 'red',
  bgDisabled: colors.disabled,
  bgDelete: colors.alarm,
  delete: '#fff',
};
