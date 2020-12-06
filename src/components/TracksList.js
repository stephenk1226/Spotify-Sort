import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import music from "../images/music.jpeg";
import { changekey } from "../utils/functions";

const TrackList = ({ tracks, handleRecommendations }) => {
  return (
    <React.Fragment>
      <div class="tracks">
        <h2 className="main-heading"> Your Tracks</h2>
        {Object.keys(tracks).length > 0 && (
          <Table responsive="md" striped borderless hover variant="dark">
            <thead>
              <tr>
                <th>Play</th>
                <th>Song Title</th>
                <th>Artist</th>
                <th>Key</th>
                <th>Tempo</th>
                <th>Energy</th>
                <th>Danceability</th>
                <th>Recommendations </th>
              </tr>
            </thead>
            {tracks.map((track, _2) => (
              <tbody>
                <tr style={{ backgroundColor: "#242a2e" }}>
                  <td>
                    <a
                      target="_blank"
                      href={track.url}
                      rel="noopener noreferrer"
                      className="card-image-link"
                    >
                      {!_.isEmpty(track) ? (
                        <img
                          variant="top"
                          src={track.image}
                          alt=""
                        />
                      ) : (
                        <img
                          src={music}
                          alt=""
                        />
                      )}
                    </a>
                  </td>
                  <td style={{ width: "60vw" }}>{track.name}</td>
                  <td style={{ width: "40vw" }}> {track.artist}</td>
                  <td style={{ width: "10vw" }}> {changekey(track.key)}</td>
                  <td style={{ width: "10vw" }}>
                    {" "}
                    {Math.round(track.tempo)} bpm
                  </td>
                  <td style={{ width: "10vw" }}>
                    {" "}
                    {Math.round(track.energy * 10)}
                  </td>
                  <td style={{ width: "10vw" }}>
                    {" "}
                    {Math.round(track.danceability * 10)}
                  </td>
                  <td style={{ width: "10vw" }}>
                    {" "}
                    <Button
                      variant="dark"
                      onClick={() =>
                        handleRecommendations(
                          track.id,
                          track.artistId,
                          track.tempo,
                          track.key,
                          track.energy,
                          track.danceability
                        )
                      }
                    >
                      {" "}
                      Recommend{" "}
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        )}
      </div>
    </React.Fragment>
  );
};
export default TrackList;
