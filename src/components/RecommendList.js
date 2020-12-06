import React from "react";
import Table from "react-bootstrap/Table";
import _ from "lodash";
import music from "../images/music.jpeg";
import { changekey } from "../utils/functions";

const RecommendList = ({ trackfeatures }) => {
  return (
    <React.Fragment>
      {Object.keys(trackfeatures).length > 0 && (
        <div className="artists">
          <h2 className="main-heading"> Recommendations</h2>
          <React.Fragment>
            <Table responsive striped borderless hover variant="dark">
              <thead className="sticky">
                <tr>
                  <th>Play</th>
                  <th>Song Title</th>
                  <th>Artist</th>
                  <th>Key</th>
                  <th>Tempo</th>
                  <th>Energy</th>
                  <th>Danceability</th>
                </tr>
              </thead>
              {trackfeatures.map((track, _2) => (
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
                          <img variant="top" src={track.image} alt="" />
                        ) : (
                          <img src={music} alt="" />
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
                  </tr>
                </tbody>
              ))}
            </Table>
          </React.Fragment>
        </div>
      )}
    </React.Fragment>
  );
};
export default RecommendList;
