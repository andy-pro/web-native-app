import { createTransform } from 'redux-persist';
import { pick } from '../__lib/utils';

export default (initialState, appName, storage) => {
  // prettier-ignore
  const transforms = [], whitelist = [], modes = [],
  paths = [
    { data: ['app', ['currentLocale']], mode: 'merge' },
    { data: ['locations'] }, // default mode 'replace'
  ];

  paths.forEach(({ data: [feature, props], mode }) => {
    whitelist.push(feature);
    modes.push(mode);
    if (!props) return;
    const inOut = state => pick(state, props);
    transforms.push(createTransform(inOut, inOut, { whitelist: [feature] }));
  });

  /*  stateReconciler function override the default shallow merge state reconciliation.
      https://github.com/rt2zz/redux-persist */
  const stateReconciler = (state, local) => {
    state.app = { ...state.app, dataReady: true };
    whitelist.forEach((key, i) => {
      let data = local[key] || initialState[key];
      // console.log('key', key, modes, modes[i], data, whitelist, transforms);
      state[key] = modes[i] === 'merge' ? { ...state[key], ...data[key] } : data;
    });
    return { ...state };
  };

  return {
    debounce: 100,
    keyPrefix: `${appName}:`,
    storage,
    transforms,
    whitelist,
    stateReconciler,
  };
};
