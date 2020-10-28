import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';

const MyPlaylistsList = ({ myplaylists, handleTracks}) => {
  return (
    <React.Fragment>
    {Object.keys(myplaylists).length > 0 && (
        <div className="artists">
          {myplaylists.items.map((playlist, index) => {
            const tracksLink = playlist.tracks.href;
            console.log(tracksLink);
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={playlist.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(playlist.images) ? (
                      <Card.Img
                        variant="top"
                        src={playlist.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{playlist.name}</Card.Title>
                    <Card.Text>
                      <small>
                        {playlist.owner.display_name}
                      </small>
                    </Card.Text>
                    <Card.Link onClick={() => handleTracks(tracksLink)}>View Tracks</Card.Link>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
    )}
    </React.Fragment>
  );
};
export default MyPlaylistsList;