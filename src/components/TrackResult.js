import React from "react";
import TracksList from "./TracksList";
const PlaylistResult = (props) => {
  const { result, handleRecommendations } = props;
  const { tracks } = result;

  return (
    <React.Fragment>
      <div>
        {tracks && <TracksList tracks={tracks} handleRecommendations={handleRecommendations} />}
      </div>
    </React.Fragment>
  );
};
export default PlaylistResult;
