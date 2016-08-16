import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import imagesReducer from './images_reducer';
import usersReducer from './users_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  images: imagesReducer,
  users: usersReducer
});

export default rootReducer;
