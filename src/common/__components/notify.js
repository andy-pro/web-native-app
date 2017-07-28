import { Alert } from '../components';
import os from '../os';

export default ({ header, message, extra = '' }) => {
  setTimeout(() => {
    // console.log('T', header, message, extra);
    let T = os.messages;
    if (extra) {
      let [tmpl, ...rest] = extra;
      extra = T.formatString(T[tmpl], ...rest);
    }
    Alert.alert(T[header], T[message] + extra);
  }, 0);
};
