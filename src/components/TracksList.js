import React from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button'
import _ from "lodash";
import music from "../images/music.jpeg";
//import { changekey, getIDs } from '../utils/functions';
import { changekey, } from '../utils/functions';

const TrackList = ({ tracks, handleRecommendations }) => {
  return (
    <React.Fragment>
      {Object.keys(tracks).length > 0 && (
        <div className="artists">
          {tracks.map((track, index) => {
            const trackArtist = track.artistId;
            const trackId = track.id;
            const tempo = track.tempo;
            const dance = track.danceability;
            const key = track.key;
            const energy = track.energy;
            return(
              <React.Fragment key={index}>
                <Table responsive striped bordered hover variant="dark">
                  <tbody>
                    <tr  style={{ backgroundColor: '#242a2e' }}>
                      <td style={{ width: "100px", height: "100px" }}>
                        <a
                          target="_blank"
                          href={track.url}
                          rel="noopener noreferrer"
                          className="card-image-link"
                        >
                          {!_.isEmpty(track) ? (
                            <img
                              style={{ width: "100px", height: "100px" }}
                              variant="top"
                              src={track.image}
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
                      <td style={{ width: "60vw" }}>{track.name}</td>
                      <td style={{ width: "40vw" }}>
                        {" "}
                        {track.artist}
                      </td>
                      <td style={{ width: "10vw" }}> {changekey(track.key)}</td>
                      <td style={{ width: "10vw" }}> {Math.round(track.tempo)}</td>
                      <td style={{ width: "10vw" }}> {Math.round(track.energy*10)}</td>
                      <td style={{ width: "10vw" }}> {track.danceability}</td>
                      <td style={{ width: "10vw" }}> <Button variant="dark" onClick={() => handleRecommendations(trackId, trackArtist, tempo, key, energy, dance)}> Recommend </Button></td>
                    </tr>
                  </tbody>
                </Table>
              </React.Fragment>
            );
        })}

        </div>
      )}
    </React.Fragment>
  );
};
export default TrackList;
