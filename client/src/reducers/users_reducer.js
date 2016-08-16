import {
  SELECT_USER,
  CLEAR_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SELECT_USER:
      return { ...state, selected: { id: action.id, username: action.username } };
    case CLEAR_USER:
      return { ...state, selected: {} };
  }

  return state;
}
