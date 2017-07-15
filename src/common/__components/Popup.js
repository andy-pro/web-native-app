import React from 'react'

import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import { View, Text, ListView, TouchableHighlight } from './';
import { suggestionsCSS as styles } from '../__themes'
import __config from '../config'


export class Popup extends React.Component {
  getChildContext() {
    return {
      popup: {
        init: this.init,
        // triggerAutosuggestMenu: this.triggerAutosuggestMenu,
        // color: 'white',
        // onKeyDown: this.onKeyDown,
        // onTargetBlur: this.onTargetBlur,
        // renderSimple: this.renderSimple,
        // renderHighlight: this.renderHighlight,
      }
    }
  }

  constructor(props) {
    // console.log('popup constructor');
    super(props)
    this.state = {
      showMenu: false,
      selectedIndex: -1,
    }
  }

  init = popups => {
    this.popups = popups
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    popups.__onKeyDown = this.onKeyDown
    popups.__onBlur = this.onBlur
    return this.triggerMenu
  }

  triggerMenu = fields => {

    let popup = this.popups[fields.__name]

    this.popup = popup

    if (!popup) return

    popup.query = fields.__query
    popup.element = fields.__element
    // console.log('trigger', this.popup.name);
    if (this.itemWasSelected) {
      // выбор пункта меню заполнит поле TextInput и вследствие этого сработает событие onChangeText
      // вот его и нужно проигнорировать, иначе выпадающий список появится опять
      this.itemWasSelected = false
      return
      // console.log('resetting select');
    }

    let trigger = () => this.setState({ showMenu, selectedIndex })

    let { query, element, pos, getSuggestions, popupOnEmpty } = popup,
        suggestions = query || popupOnEmpty ? getSuggestions(query) : [],
        len = suggestions.length,
        showMenu = Boolean(len),
        selectedIndex = -1
    this.suggestions = suggestions
    // console.log('trigger start', this.itemWasSelected, popup.query, len);
    if (showMenu) {
      if (len === 1) {
        suggestions[0].selected = true
        selectedIndex = 0
      }
      if (element) {
        /* Offsets: ReactNative = -12; Browser = 30 */
        // console.log('before measure, native:', __config.isNative);
        if (__config.isNative) {
          element.measure( (fx, fy, width, height, px, py) => {
            // fx, fy - offset to frame; px, py - offset to page
            this.position = { ...pos, top: py - 12 }
            // console.log('after measure, fy:', fy, 'pos:', py);

            /*
            console.log('fx', fx);
            console.log('fy', fy);
            console.log('width', width);
            console.log('height', height);
            console.log('px', px);
            console.log('py', py);
            */

            trigger()
          })
        } else {
          this.position = { ...pos, top: 30 +  element.offsetTop }
          trigger()
        }
      }
    } else trigger()
  }

  componentWillUnmount() {
    clearTimeout(this.__timeout)
  }

  onBlur = () => {
    // console.log('blur timeout');
    if (this.state.showMenu) {
      this.__timeout = setTimeout(() => {
        // console.log('timeout');
        // if (!this.itemWasSelected) this.setState({ showMenu: false })
        // if (!this.state.popup.itemWasSelected) {
        if (this.state.showMenu)
          this.setState({ showMenu: false })
      })
    }
  }

  onKeyDown = e => {
    let { showMenu, selectedIndex: si } = this.state
    this.itemWasSelected = false

    const changeSelected = nextIndex => {
      e.preventDefault()
      this.suggestions.forEach((item, i) => item.selected = i === nextIndex)
      this.setState({ selectedIndex: nextIndex })
    }

    // console.log('key down', e.key );
    if (showMenu) {
      switch (e.key) {
        case 'Enter':
          let s = this.suggestions.find(item => item.selected)
          if (s) {
            e.preventDefault()
            this.selectSuggestion(s)
          }
          return
        case 'ArrowDown':
          if (si < this.suggestions.length - 1) changeSelected(++si)
          return
        case 'ArrowUp':
          if (si > 0) changeSelected(--si)
          return
        case 'Escape':
          this.setState({ showMenu: false })
      }
    }
  }

  selectSuggestion = s => {
    // console.log('selectSuggestion', this.popup.name);
    this.popup.onSelect(s, this.popup)
    if (!this.popup.popupOnEmpty) {
      this.itemWasSelected = true
    }
    this.setState({ showMenu: false })
  }

  renderSuggestion = suggestion => {
    let { popup } = this
    return (
      <TouchableHighlight
        onPress={() => this.selectSuggestion(suggestion)}
        underlayColor='#bbb'
        $ref={c => {
          if (suggestion.selected && c)
            c.scrollIntoViewIfNeeded(false)
        }}>
        {popup.renderSuggestion(suggestion, popup)}
      </TouchableHighlight>
    )
  }

  render() {
    // console.log('popup menu renderer', this.state.showMenu);
    // console.log('popup menu renderer', Object.keys(this.props.children));
    return (
      <View style={styles.root}>

        {this.props.children}

        {(this.state.showMenu && this.popup && this.popup.renderSuggestion) &&
          <View style={[styles.list, this.position]}>
            <ListView
              dataSource={this.ds.cloneWithRows(this.suggestions)}
              keyboardShouldPersistTaps='always'
              enableEmptySections={true}
              renderRow={this.renderSuggestion}
            />
          </View>
        }
      </View>
    );
  }

}

Popup.childContextTypes = {
  popup: React.PropTypes.object
}


/*~~~~~~~~~~~~~~~~render helpers~~~~~~~~~~~~~~~~*/

// PopupMenu.renderHighlight = ({ title, selected }, { query }) => {
export const RenderHighlight = ({ title, selected }, { query }) => {
  // { query, title: 'xxx' or ['xxx', {highlight: 'yyy'}, 'zzz', ...], selected }
  // 'xxx' => [{ highlight: 'xxx' }]
  let words = Array.isArray(title) ? title : [{ highlight: title }]
  const item =
    <Text style={styles.text}>
      {words.map((word, i) => {
        if (typeof word === 'object') {
          const matches = [[0, query.length]];
          const parts = AutosuggestHighlightParse(word.highlight, matches);
          return parts.map((part, index) => {
            let props = { key: index }
            if (part.highlight) props.style = styles.highlight
            return <Text {...props}>{part.text}</Text>
          })
        } else return word
      })}
    </Text>
  return renderItem(item, selected)
}

export const RenderSimple = ({ title, selected }) => {
  const item =
    <Text style={styles.text}>
      {title}
    </Text>
  return renderItem(item, selected)
}

const renderItem = (item, selected) =>
  <View style={selected ? styles.selected : styles.view}>
    {item}
  </View>

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
