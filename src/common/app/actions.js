import { Observable } from 'rxjs';

export const appError = error => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const dispatchError = error => Observable.of(appError(error));

export const appStart = () => ({
  type: 'APP_START',
});

export const appStop = () => ({
  type: 'APP_STOP',
});

export const appShowMenu = payload => ({
  type: 'APP_SHOW_MENU',
  payload, // menuShown: boolean
});

export const setLocale = payload => ({
  type: 'SET_LOCALE',
  payload,
});

export const appLayout = payload => ({
  type: 'APP_LAYOUT',
  payload,
});

export const setSortMode = payload => ({
  type: 'SET_SORT_MODE',
  payload,
});

export const setEntry = payload => ({
  type: 'SET_ENTRY',
  payload,
});

export const resetEntry = () => ({
  type: 'RESET_ENTRY',
});

export const resetForm = () => ({
  type: 'RESET_FORM',
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const setCommand = payload => {
  let { name, path, entry, opts } = payload;
  if (name.startsWith('pre_')) {
    payload.isForm = name === 'pre_insert' || name === 'pre_update';
    return {
      type: 'SET_COMMAND',
      payload,
    };
  }
  if (name === 'remove') entry = entry.id;
  return {
    type: 'epic/UPDATE',
    list: path.replace(/^\//, ''),
    payload: entry,
    cmd: name, // insert, update, remove, purge, replace
    opts,
  };
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* It's just a stub, immediately resolving an observer.
   Here you can provide any asynchronous operation, for example, ajax request. 
   https://redux-observable.js.org/docs/basics/Epics.html */
const cmdUpdateLocal = payload => Observable.of(payload);

const cmdEpic = action$ =>
  action$.ofType('epic/UPDATE').mergeMap(({ list, payload, cmd, opts = {} }) =>
    cmdUpdateLocal(payload, cmd)
      .map(response => ({
        type: `${opts.notify ? 'notify/' : ''}${list}/UPDATED`,
        payload,
        opts,
        response,
        cmd,
      }))
      .catch(dispatchError)
  );

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [cmdEpic];
