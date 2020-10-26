import React from 'react';
import TracksList from './TracksList';
const PlaylistResult = (props) => {
  const { result } = props;
  const {tracks, trackfeatures} = result;
  return (
    <React.Fragment>
      <div>
       {tracks && <TracksList tracks={tracks} trackfeatures={trackfeatures} />}
      </div>
    </React.Fragment>
  );
};
export default PlaylistResult;