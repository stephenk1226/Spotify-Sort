import React from "react";
import Table from "react-bootstrap/Table";
import _ from "lodash";
import music from "../images/music.jpeg";
//import { changekey, getIDs } from '../utils/functions';
import { changekey, } from '../utils/functions';

const TrackList = ({ tracks, trackfeatures }) => {
  console.log(Object.keys(trackfeatures).length);
  //getIDs(tracks);
  return (
    <React.Fragment>
      {Object.keys(tracks).length > 0 && (
        <div className="artists">
          {tracks.items.map((track, index) => {
            return trackfeatures.audio_features.map((trackf) => (
              <React.Fragment key={index}>
                <Table responsive striped bordered hover variant="dark">
                  <tbody>
                    <tr  style={{ backgroundColor: '#242a2e' }}>
                      <td style={{ width: "100px", height: "100px" }}>
                        <a
                          target="_blank"
                          href={track.track.external_urls.spotify}
                          rel="noopener noreferrer"
                          className="card-image-link"
                        >
                          {!_.isEmpty(track) ? (
                            <img
                              style={{ width: "100px", height: "100px" }}
                              variant="top"
                              src={track.track.album.images[0].url}
                              alt=""
                            />
                          ) : (
                            <img
                              style={{ width: "100px", height: "100px" }}
                              src={music}
                              alt=""
                            />
                          )}
                        </a>
                      </td>
                      <td style={{ width: "60vw" }}>{track.track.name}</td>
                      <td style={{ width: "40vw" }}>
                        {" "}
                        {track.track.album.artists[0].name}
                      </td>
                      <td style={{ width: "10vw" }}> {changekey(trackf.key)}</td>
                      <td style={{ width: "10vw" }}> {Math.round(trackf.tempo)}</td>
                      <td style={{ width: "10vw" }}> {trackf.id}</td>
                    </tr>
                  </tbody>
                </Table>
              </React.Fragment>
            ));
        })}

        </div>
      )}
    </React.Fragment>
  );
};
export default TrackList;
