import 'rxjs';
import { combineEpics } from 'redux-observable';

import { epics as appEpics } from '../app/actions';
import { epics as backupEpics } from '../__backup/actions';

// prettier-ignore
const epics = [
  ...appEpics,
  ...backupEpics,
];

/* inject deps:
    config,
    storageEngine,
    backup,
    messages,
*/
const configureEpics = deps => (action$, { dispatch, getState }) =>
  combineEpics(...epics)(action$, { ...deps, dispatch, getState });

export default configureEpics;
