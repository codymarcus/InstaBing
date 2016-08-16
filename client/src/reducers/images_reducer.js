import {
  FETCH_IMAGES,
  UPDATE_COMMENT
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_IMAGES:
      return action.payload;
    case UPDATE_COMMENT:
      const nextState = [];
      for(let image of state) {
        if (image.id === action.imageId) {
          nextState.push({ ...image, comment: action.comment });
        } else {
          nextState.push(image);
        }
      }
      return nextState;
  }

  return state;
}
