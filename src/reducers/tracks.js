import { SET_TRACKS } from '../utils/constants';
const tracksReducer = (state = {}, action) => {
  const { tracks } = action;
  switch (action.type) {
    case SET_TRACKS:
      return tracks;
    default:
      return state;
  }
};
export default tracksReducer;


