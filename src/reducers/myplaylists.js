import { SET_MY_PLAYLISTS } from '../utils/constants';
const myplaylistReducer = (state = {}, action) => {
  const { myplaylists } = action;
  switch (action.type) {
    case SET_MY_PLAYLISTS:
      return myplaylists;
    default:
      return state;
  }
};
export default myplaylistReducer;


