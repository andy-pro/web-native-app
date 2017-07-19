import os from '../../../common/os';

var pressTimer;

export default (output, { onPress, onLongPress }) => {
  let { touchEvents } = os;
  // console.log('touchEvents', touchEvents);
  output.onClick = e => {
    clearTimeout(pressTimer);
    if (pressTimer !== undefined) {
      // if (to) {
      //   if (onNavigate) onNavigate(e);
      //   to();
      // }
      if (onPress) {
        onPress(e);
      }
    }
    return false;
  };
  output[touchEvents.onMouseUp] = () => {
    clearTimeout(pressTimer);
    return false;
  };
  output[touchEvents.onMouseOut] = () => {
    clearTimeout(pressTimer);
    pressTimer = undefined;
    return false;
  };
  output[touchEvents.onMouseDown] = e => {
    pressTimer = setTimeout(() => {
      pressTimer = undefined;
      onLongPress(e);
    }, 1000);
    return false;
  };
};
