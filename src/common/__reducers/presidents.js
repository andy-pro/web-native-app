import { cmdUpdateLocal } from '../__lib/utils';

export default (state = [], action) => {
  switch (action.type) {
    case 'presidents/UPDATED':
    case 'notify/presidents/UPDATED':
      return cmdUpdateLocal(state, action);

    default:
      return state;
  }
};
