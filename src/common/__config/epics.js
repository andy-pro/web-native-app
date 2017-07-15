import 'rxjs';
import { combineEpics } from 'redux-observable';

import { epics as appEpics } from '../app/actions';

const epics = [...appEpics];

const configureEpics = deps => (action$, { dispatch, getState }) =>
  combineEpics(...epics)(action$, { ...deps, dispatch, getState });

export default configureEpics;
