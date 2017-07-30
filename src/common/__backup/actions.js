import { Observable } from 'rxjs';

// import { pick } from '../__lib/utils';
import { EXPORTED, IMPORTED } from './constants';
import { appError, dispatchError } from '../app/actions';
import config from '../config';

export const exportData = (payload, opts) => ({
  type: 'db/EXPORT',
  payload,
  opts,
});

export const importData = (fileName, opts) => ({
  type: 'db/IMPORT',
  fileName,
  opts,
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const stringify = data => JSON.stringify(data, null, 2);

const notify = (header, type, data) => ({
  notify: {
    header: header + type,
    message: 'success',
    extra: ['count.' + type, data.payload.length],
  },
});

const addHeader = ({ type, payload, opts }) => ({
  appName: config.appName,
  type: opts.source,
  date: new Date().toLocaleString(),
  storage: config.storage,
  payload,
});

const setImportedData = (data, opts) => {
  if (data) {
    let { type, appName, payload } = data;
    if (appName === config.appName) {
      return {
        type: IMPORTED,
        payload: { data: payload, opts },
        opts: notify('import.', type, data),
      };
    }
  }
  return appError(new Error('Invalid file format.'));
};

/*~~~~~~~~~~~~~~~~~~~ epics ~~~~~~~~~~~~~~~~~~~~*/
const exportEpic = (action$, { config, backup }) =>
  action$.ofType('db/EXPORT').mergeMap(action => {
    let data = addHeader(action),
      { opts } = action;
    backup.download(stringify(data), opts.exportName);
    Object.assign(opts, notify('export.', opts.source, data));
    return Observable.of({ type: EXPORTED, opts });
  });

const importEpic = (action$, { backup }) =>
  action$
    .ofType('db/IMPORT')
    .mergeMap(({ fileName, opts }) =>
      backup
        .upload(fileName)
        .map(data => setImportedData(data, opts))
        .catch(dispatchError)
    );

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [exportEpic, importEpic];
