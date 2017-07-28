import { combineReducers } from 'redux';

import app from '../app/reducer';
import locations from '../__reducers/locations';
import presidents from '../__reducers/presidents';

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (state, action) => {
  const userWasSignedOut = action.type === 'ON_AUTH' && state.user;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer(
    {
      app: state.app,
    },
    action
  );
};

const configureReducer = initialState => {
  let reducer = {
    app,
    locations,
    presidents,
  };

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  return resetStateOnSignOutReducer(combineReducers(reducer), initialState);
};

export default configureReducer;
