// import { REHYDRATE } from 'redux-persist/constants';
import { cmdUpdateLocal } from '../__lib/utils';
// import initialState from '../initialState';

export default (state = [], action) => {
  switch (action.type) {
    // this is the care of the autoRehydrate({stateReconciler})
    // case REHYDRATE:
    // load mock data for first run
    // return action.payload.locations ? state : initialState.locations;

    case 'locations/UPDATED':
    case 'notify/locations/UPDATED':
      return cmdUpdateLocal(state, action);

    default:
      return state;
  }
};
