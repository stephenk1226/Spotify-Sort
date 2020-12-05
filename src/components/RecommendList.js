import React from "react";
import Table from "react-bootstrap/Table";
import _ from "lodash";
import music from "../images/music.jpeg";
//import { changekey, } from '../utils/functions';

const RecommendList = ({ trackfeatures }) => {
  return (
    <React.Fragment>
      {Object.keys(trackfeatures).length > 0 && (
        <div className="artists">
          {trackfeatures.map((track, index) => {
            return(
              <React.Fragment key={index}>
                <Table responsive striped bordered hover variant="dark">
                  <tbody>
                    <tr  style={{ backgroundColor: '#242a2e' }}>
                      <td style={{ width: "100px", height: "100px" }}>
                        <a
                          target="_blank"
                          href={track.external_urls.spotify}
                          rel="noopener noreferrer"
                          className="card-image-link"
                        >
                          {!_.isEmpty(track) ? (
                            <img
                              style={{ width: "100px", height: "100px" }}
                              variant="top"
                              src={track.album.images[0].url}
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
                        {track.artists[0].name}
                      </td>
                      {/* <td style={{ width: "10vw" }}> {changekey(track.key)}</td>
                      <td style={{ width: "10vw" }}> {Math.round(track.tempo)}</td>
                      <td style={{ width: "10vw" }}> {Math.round(track.energy*10)}</td>
                      <td style={{ width: "10vw" }}> {track.danceability}</td> */}
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
export default RecommendList;
