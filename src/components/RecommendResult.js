import React from "react";
import RecommendList from "./RecommendList";
const PlaylistResult = (props) => {
  const { result } = props;
  const { trackfeatures } = result;

  return (
    <React.Fragment>
      <div>
        {trackfeatures && <RecommendList trackfeatures={trackfeatures}  />}
      </div>
    </React.Fragment>
  );
};
export default PlaylistResult;
