import os from '../../../common/os';

var pressTimer;

export default (output, { to, onLongPress, onNavigate }) => {
  let { touchEvents } = os;
  // console.log('touchEvents', touchEvents);
  output.onClick = () => {
    clearTimeout(pressTimer);
    if (pressTimer !== undefined) {
      if (onNavigate) onNavigate();
      to();
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
  output[touchEvents.onMouseDown] = () => {
    pressTimer = setTimeout(() => {
      pressTimer = undefined;
      onLongPress();
    }, 1000);
    return false;
  };
};
