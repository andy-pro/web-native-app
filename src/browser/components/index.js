/* browser components */

import Helmet from 'react-helmet';
import DropdownMenu from './DropdownMenu';
// import DatePicker from './DatePicker'
import ListView from './ListView';
import FlatList from './FlatList';
import SectionList from './SectionList';
import FormWrapper from '../../common/__components/FormWrapper';
import Dialogs from '../../common/__components/Dialogs';
import Checkbox from '../../common/__components/Checkbox';
import { View } from './fela';

const Alert = {
  alert: (hdr, msg, btns) => {
    if (msg) hdr = hdr + '\n' + msg;
    if (!btns) alert(hdr);
    else {
      let onCancel = btns[0].onPress,
        onOk = btns[1].onPress;
      if (confirm(hdr)) onOk();
      else if (onCancel) onCancel();
    }
  },
};

export { TouchLink, Link } from './Link';
export { Icon, IconButton, IconLink } from './Icons.js';
export { Svg, G, Path, Circle, Rect, SvgText } from './fela';

export {
  Helmet,
  DropdownMenu,
  // DatePicker,
  Checkbox,
  ListView,
  FlatList,
  SectionList,
  FormWrapper,
  Dialogs,
  Alert,
};

export {
  Text,
  Form,
  Button,
  TextInput,
  FileInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  Picker,
} from './fela';

export { View, View as Drawer };
export { Route, Redirect, withRouter } from 'react-router-dom';
