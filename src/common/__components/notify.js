import { Alert } from './';

const notify = ({ header, message, extra = '' }, T) => {
  setTimeout(() => {
    if (extra) {
      let [tmpl, ...rest] = extra;
      extra = T.formatString(T[tmpl], ...rest);
    }
    Alert.alert(T[header], T[message] + extra);
  }, 0);
};

export default notify;
