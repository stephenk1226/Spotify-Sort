import React from 'react';
import MyPlaylistsList from './MyPlaylistsList';
const PlaylistResult = (props) => {
  const { result, handleTracks} = props;
  const {myplaylists} = result;

  return (
    <React.Fragment>
      <div>
       {myplaylists && <MyPlaylistsList myplaylists={myplaylists}  handleTracks= {handleTracks}/>}
      </div>
    </React.Fragment>
  );
};
export default PlaylistResult;