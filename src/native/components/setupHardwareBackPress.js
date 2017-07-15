import { BackAndroid } from 'react-native';

export default os => {
  os.subscribe = (type, handler) => {
    switch (type) {
      case 'hardwareBackPress':
        BackAndroid.addEventListener('hardwareBackPress', handler);
        break;

      default:
        break;
    }
  };
};
