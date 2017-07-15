import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

let el = document.getElementById('app');

ReactDOM.render(<Root />, el);

if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default;
    ReactDOM.render(<NextRoot />, el);
  });
}
