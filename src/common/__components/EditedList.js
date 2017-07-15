import React from 'react';
import { connect } from 'react-redux';
import { setCommand, setEntry, resetEntry, resetForm } from '../app/actions';
import { View, SectionList } from '../components';
import Dialogs from './Dialogs';
import { mainCSS } from '../styles';

const mapStateToProps = stateProps => state => {
  let { app } = state,
    props = {
      command: app.command,
      entry: app.entry,
      sortMode: app.sortMode,
    };
  stateProps.forEach(key => (props[key] = state[key]));
  return props;
};

export default ({
  listName,
  stateProps,
  Form,
  onListMount,
  renderSectionHeader,
  renderItem,
  isDataChanged,
  toSections,
}) =>
  connect(mapStateToProps(stateProps), {
    /* actions */
    setCommand,
    setEntry,
    resetEntry,
    resetForm,
  })(
    class extends React.Component {
      componentWillMount() {
        let { props } = this,
          { command } = props;
        this.sections = this.checkAndToSections(props);
        if (command) {
          if (command.isForm) this.mode = command.name;
        }
        if (onListMount) onListMount(props);
      }

      componentWillReceiveProps(nextProps) {
        let { command } = nextProps;
        if (command !== this.props.command) {
          if (command) {
            if (command.isForm) {
              this.mode = command.name;
            }
          } else {
            this.mode = '';
          }
        }
        if (isDataChanged.bind(this, nextProps)) {
          this.sections = this.checkAndToSections(nextProps);
        }
      }

      checkAndToSections = props => {
        let sections = toSections(props),
          { error } = sections;
        if (error) {
          Dialogs.deleteDamaged(error.info);
          this.props.setCommans({
            name: 'purge',
            path: listName,
            entry: error.indexes,
          });
        }
        return sections;
      };

      onItemLongPress = entry =>
        this.props.setEntry({
          listName,
          entry,
        });

      render() {
        let { mode, sections } = this;
        // console.log('this EDITED LIST render', mode);
        return (
          <View style={[mainCSS.fullArea, mainCSS.limited]}>
            {Boolean(mode) && <Form mode={mode} listName={listName} {...this.props} />}
            <SectionList
              contentContainerStyle={mainCSS.list}
              sections={sections}
              renderSectionHeader={renderSectionHeader}
              renderItem={renderItem.bind(this)}
              ItemSeparatorComponent={() => <View style={mainCSS.divider} />}
              SectionSeparatorComponent={() => <View style={mainCSS.vgap20} />}
              keyExtractor={item => item.id}
            />
          </View>
        );
      }
    }
  );
