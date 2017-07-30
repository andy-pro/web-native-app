import { cmdUpdateLocal } from '../__lib/utils';
import app from '../app/reducer';

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (state, action) => {
  const userWasSignedOut = action.type === 'ON_AUTH' && state.user;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer({ app: state.app }, action);
};

const configureReducer = initialState => {
  const lists = {
    locations: [],
    presidents: [],
    users: [],
  };
  /* combineReducers is not always a good idea. For database-like state,
     a single reducer is the best choice. Now we can perform the same 
     operations (CRUD) on different collections in a very simple way */
  const reducer = (state = lists, action) => {
    if (action.type === 'LIST_UPDATE') {
      let { list } = action;
      state[list] = cmdUpdateLocal(state[list], action);
    }
    state.app = app(state.app, action);
    return { ...state };
  };

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  // return resetStateOnSignOutReducer(combineReducers(reducer), initialState);
  return resetStateOnSignOutReducer(reducer, initialState);
};

export default configureReducer;
