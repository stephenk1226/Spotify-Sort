import { SET_TRACKS_FEATURES } from '../utils/constants';
const tracksFeaturesReducer = (state = {}, action) => {
  const { trackfeatures } = action;
  switch (action.type) {
    case SET_TRACKS_FEATURES:
      return trackfeatures;
    default:
      return state;
  }
};
export default tracksFeaturesReducer;


