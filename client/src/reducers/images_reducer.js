import {
  FETCH_IMAGES,
  FETCHING_IMAGES,
  UPDATE_COMMENT
} from '../actions/types';

export default function(state = { all: [], fetching: false }, action) {
  switch(action.type) {
    case FETCH_IMAGES:
      return { ...state, all: action.payload, fetching: false };
    case FETCHING_IMAGES:
      return { ...state, fetching: true };
    case UPDATE_COMMENT:
      const nextImages = [];
      for(let image of state.all) {
        if (image.id === action.imageId) {
          nextImages.push({ ...image, comment: action.comment });
        } else {
          nextImages.push(image);
        }
      }
      return { ...state, all: nextImages };
  }

  return state;
}
