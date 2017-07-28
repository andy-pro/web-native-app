import React from 'react';

import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import { View, Text, ListView, TouchableHighlight } from '../components';
import { suggestionsCSS as styles } from '../styles';
import os from '../os';

export default class Popup extends React.Component {
  getChildContext() {
    return {
      popup: {
        init: (popups, fields) => {
          this.popups = popups;
          this.fields = fields;
          this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
          return {
            popups,
            onKeyDown: this.onKeyDown,
            onBlur: this.onBlur,
            trigger: this.triggerMenu,
          };
        },
      },
    };
  }

  constructor(props) {
    // console.log('popup constructor');
    super(props);
    this.state = {
      showMenu: false,
      selectedIndex: -1,
    };
  }

  triggerMenu = fields => {
    // prevent repetitive re-render
    if (fields === this.fields) return;
    this.fields = fields;

    let popup = this.popups[fields.__name];
    this.popup = popup;
    if (!popup) return;

    popup.query = fields.__query;
    popup.element = fields.__element;
    // console.log('try trigger', fields, this.popup, this.itemWasSelected);
    if (this.itemWasSelected) {
      /*  если после выбора пункта меню заполнять поле TextInput  методом
          this.props.fields.field.onChangeText(value)
          то сработает событие onChangeText - его нужно проигнорировать, 
          иначе выпадающий список появится опять */
      this.itemWasSelected = false;
      console.log('resetting select');
      return;
    }

    let trigger = () => this.setState({ showMenu, selectedIndex });

    let { query, list, key, element, pos, getSuggestions, popupOnEmpty } = popup,
      suggestions = query || popupOnEmpty ? getSuggestions(query, list, key) : [],
      len = suggestions.length,
      showMenu = Boolean(len),
      selectedIndex = -1;
    this.suggestions = suggestions;
    // console.log('trigger start', this.itemWasSelected, popup.query, len);
    if (showMenu) {
      if (len === 1) {
        suggestions[0].__selected = true;
        selectedIndex = 0;
      }
      if (element) {
        /* Offsets: ReactNative = -12; Browser = 30 */
        // console.log('before measure, native:', os.isNative);
        if (os.isNative) {
          element.measure((fx, fy, width, height, px, py) => {
            // fx, fy - offset to frame; px, py - offset to page
            this.position = { ...pos, top: py - 12 };
            // console.log('after measure, fy:', fy, 'pos:', py);

            /*
            console.log('fx', fx);
            console.log('fy', fy);
            console.log('width', width);
            console.log('height', height);
            console.log('px', px);
            console.log('py', py);
            */

            trigger();
          });
        } else {
          this.position = { ...pos, top: 30 + element.offsetTop };
          trigger();
        }
      }
    } else trigger();
  };

  componentWillUnmount() {
    clearTimeout(this.__timeout);
  }

  onBlur = () => {
    // console.log('blur timeout');
    if (this.state.showMenu) {
      this.__timeout = setTimeout(() => {
        // console.log('timeout');
        // if (!this.itemWasSelected) this.setState({ showMenu: false })
        // if (!this.state.popup.itemWasSelected) {
        if (this.state.showMenu) this.setState({ showMenu: false });
      });
    }
  };

  onKeyDown = e => {
    let { showMenu, selectedIndex: si } = this.state;
    this.itemWasSelected = false;

    const changeSelected = nextIndex => {
      e.preventDefault();
      this.suggestions.forEach((item, i) => (item.__selected = i === nextIndex));
      this.setState({ selectedIndex: nextIndex });
    };

    // console.log('key down', e.key );
    if (showMenu) {
      switch (e.key) {
        case 'Enter':
          let s = this.suggestions.find(item => item.__selected);
          if (s) {
            e.preventDefault();
            this.selectSuggestion(s);
          }
          return;
        case 'ArrowDown':
          if (si < this.suggestions.length - 1) changeSelected(++si);
          return;
        case 'ArrowUp':
          if (si > 0) changeSelected(--si);
          return;
        case 'Escape':
          this.setState({ showMenu: false });
      }
    }
  };

  selectSuggestion = s => {
    // console.log('selectSuggestion', this.popup);
    this.popup.onSelect(s, this.popup);
    if (!this.popup.popupOnEmpty) {
      this.itemWasSelected = true;
    }
    this.setState({ showMenu: false });
  };

  renderSuggestion = suggestion => {
    let { popup } = this;
    return (
      <TouchableHighlight
        onPress={() => this.selectSuggestion(suggestion)}
        underlayColor="#bbb"
        $ref={c => {
          if (suggestion.__selected && c) c.scrollIntoViewIfNeeded(false);
        }}
      >
        {popup.renderSuggestion(suggestion, popup)}
      </TouchableHighlight>
    );
  };

  render() {
    // console.log('popup menu renderer', this.state.showMenu);
    // console.log('popup menu renderer', Object.keys(this.props.children));
    return (
      <View style={styles.root}>
        {this.props.children}

        {this.state.showMenu &&
          this.popup &&
          this.popup.renderSuggestion &&
          <ListView
            contentContainerStyle={[styles.list, this.position]}
            dataSource={this.ds.cloneWithRows(this.suggestions)}
            keyboardShouldPersistTaps="always"
            enableEmptySections={true}
            renderRow={this.renderSuggestion}
          />}
      </View>
    );
  }
}

Popup.childContextTypes = {
  popup: React.PropTypes.object,
};

/*~~~~~~~~~~~~~~suggestion finders~~~~~~~~~~~~~~*/

export const FindSimple = (query, list, key) => {
  query = query.toLowerCase();
  return list
    .filter(item => item[key].toLowerCase().startsWith(query))
    .map(item => ({ ...item }));
};

const parseHighlight = (str, query) => {
  let re = new RegExp('\\b' + query, 'ig'),
    parts = [],
    start = 0,
    res,
    text;
  while ((res = re.exec(str)) != null) {
    text = str.slice(start, res.index);
    if (text) parts.push({ text });
    parts.push({
      text: res[0],
      highlight: true,
    });
    start = re.lastIndex;
  }
  if (start) {
    // at least one match was occured
    if ((text = str.slice(start)) !== '') {
      parts.push({ text });
    }
    return parts;
  }
  return false;
};

export const FindMultiword = (query, list, key) =>
  list.reduce((res, item) => {
    // console.log('key', key);
    let __parts = parseHighlight(item[key], query);
    if (__parts) {
      res.push({ ...item, __parts });
    }
    return res;
  }, []);

/*~~~~~~~~~~~~~~~~render helpers~~~~~~~~~~~~~~~~*/

const renderItem = (item, selected) =>
  <View style={selected ? styles.selected : styles.view}>
    {item}
  </View>;

export const RenderMultiword = ({ __parts, __selected }, { query }) => {
  const item = (
    <Text style={styles.text}>
      {__parts.map((part, i) =>
        <Text key={i} style={part.highlight ? styles.highlight : null}>
          {part.text}
        </Text>
      )}
    </Text>
  );
  return renderItem(item, __selected);
};

export const RenderHighlight = (suggestion, { key, query }) => {
  // console.log('suggestion', suggestion, key, query);
  let words = suggestion[key];
  // { query, words: 'xxx' or ['xxx', {highlight: 'yyy'}, 'zzz', ...], suggestion.__selected }
  // 'xxx' => [{ highlight: 'xxx' }]
  if (!Array.isArray(words)) words = [{ highlight: words }];
  const item = (
    <Text style={styles.text}>
      {words.map((word, i) => {
        if (typeof word === 'object') {
          const matches = [[0, query.length]];
          const parts = AutosuggestHighlightParse(word.highlight, matches);
          return parts.map((part, index) => {
            let props = { key: index };
            if (part.highlight) props.style = styles.highlight;
            return (
              <Text {...props}>
                {part.text}
              </Text>
            );
          });
        } else return word;
      })}
    </Text>
  );
  return renderItem(item, suggestion.__selected);
};

export const RenderSimple = (suggestion, { key }) => {
  const item = (
    <Text style={styles.text}>
      {suggestion[key]}
    </Text>
  );
  return renderItem(item, suggestion.__selected);
};
