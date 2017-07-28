import { setImportedData } from '../app/actions';

import { appError } from '../app/actions';
// import { pick } from '../__lib/utils';
import config from '../config';

export const __api_notify = (header, type, data) => ({
  notify: {
    header: header + type,
    message: 'success',
    extra: ['count.' + type, data.length],
  },
});
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const addHeader = (payload, header) =>
  Object.assign(header, {
    appName: config.appName,
    date: new Date().toLocaleString(),
    storage: config.storage,
    payload,
  });

export const __api_export = (data, { source }) => {
  let header = { type: source };
  return addHeader(data, header);
};
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const __api_import = (data, mode) => {
  // data check
  if (data) {
    let { type, appName, payload } = data;
    if (appName === config.appName) {
      let opts = __api_notify('import.', type, payload);
      return setImportedData({ mode, data: payload }, opts);
    }
  }
  return appError(new Error('Invalid file format.'));
};
