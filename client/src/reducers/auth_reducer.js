import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, username: action.username, id: action.id, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, username: null, id: null, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
