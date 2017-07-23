import EditedList from '../__components/EditedList';
import FormHelper from '../__components/FormHelper';
import Form from './Form';
import { checkData } from '../__lib/utils';
import * as renderProps from '../list_common/elements';
import __toSections from '../list_common/toSections';
import initialState from '../initialState';

const toSections = ({ locations, ...props }) => {
  let { data, error } = checkData(locations, Form.model.fields);
  props.locations = data;
  let sections = __toSections(props);
  sections.error = error;
  return sections;
};

function isDataChanged({ categories, locations }) {
  return locations !== this.props.locations;
}

function onListMount({ command, resetEntry }) {
  if (command && command.external) return;
  resetEntry();
}

export default EditedList({
  // map state to props
  stateProps: ['locations'],
  // EditedList component props
  listName: 'locations',
  Form: FormHelper(Form),
  onListMount,
  renderProps,
  isDataChanged,
  toSections,
  // user props
  categories: [{ name: '-= No category =-', id: 0 }].concat(initialState.categories),
});
