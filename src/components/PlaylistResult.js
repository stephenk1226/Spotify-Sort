import React from 'react';
import MyPlaylistsList from './MyPlaylistsList';
const PlaylistResult = (props) => {
  const { result } = props;
  const {myplaylists} = result;
  return (
    <React.Fragment>
      <div>
       {myplaylists && <MyPlaylistsList myplaylists={myplaylists} />}
      </div>
    </React.Fragment>
  );
};
export default PlaylistResult;