// not work in production! why?
// desktop Chrome 57, Firefox 53 - return 'true'
/*
let touchDetector1 = () => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};
*/

// https://github.com/john-doherty/long-press
/*
// desktop Chrome 57, Firefox 53 - return 'true'
let touchDetector2 = () =>
  'ontouchstart' in window ||
  navigator.MaxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;
*/

export default os => {
  // const isTouch = touchDetector1();

  // http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
  // https://medium.com/@david.gilbertson/the-only-way-to-detect-touch-with-javascript-7791a3346685
  // In general, this is a problem
  const isTouch = false;

  os.isTouchDevice = isTouch;
  os.touchEvents = {
    onMouseDown: isTouch ? 'onTouchStart' : 'onMouseDown',
    onMouseOut: isTouch ? 'onTouchCancel' : 'onMouseOut',
    onMouseUp: isTouch ? 'onTouchEnd' : 'onMouseUp',
  };
  // alert(JSON.stringify(os.touchEvents));
};
