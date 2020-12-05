import React from "react";
import TracksList from "./TracksList";
const PlaylistResult = (props) => {
  const { result } = props;
  const { tracks, trackfeatures } = result;
  //console.log(tracks);
 
/* 
    const newTracks = tracks.items.map((track, index) => {
      return Object.assign(trackfeatures[index], track);
    });
    console.log("NEW TRACKS");
    console.log(newTracks);
   */
   

  return (
    <React.Fragment>
      <div>
        {tracks && <TracksList tracks={tracks} trackfeatures={trackfeatures} />}
      </div>
    </React.Fragment>
  );
};
export default PlaylistResult;
