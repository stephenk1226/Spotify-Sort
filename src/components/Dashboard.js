import React, { useState } from "react";
import { connect } from "react-redux";
import SearchResult from "./SearchResult";
import PlaylistResult from "./PlaylistResult";
import TrackResult from "./TrackResult";
import { Navbar, Nav } from "react-bootstrap";
import SearchForm from "./SearchForm";
import { Redirect } from "react-router-dom";
import {
  initiateGetResult,
  initiateGetPlaylists,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists,
  initiateGetTracks,
  initiateGetTracksFeatures,
} from "../actions/result";
import Loader from "./Loader";
import { getIDs } from "../utils/functions";

const Dashboard = (props) => {
  //var id = "4RKrdQnH1Sgpp3NUTzYvTA";
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("albums");
  const { isValidSession, history } = props;
  props.dispatch(initiateGetPlaylists());
  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory("albums");
      });
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const handleTracks = async (url) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetTracks(url)).then(() => {
        setIsLoading(false);
      });
      const { tracks } = props;
      const ids = getIDs(tracks);
      alert(ids);
      if (ids !== undefined) {
        props.dispatch(initiateGetTracksFeatures(ids)).then(() => {
          setIsLoading(false);
        });
      } else {
        props
          .dispatch(
            initiateGetTracksFeatures(
              "4JpKVNYnVcJ8tuMKjAj50A,4vyLcnuVAwrLOf46w5FrjB"
            )
          )
          .then(() => {
            setIsLoading(false);
          });
      }
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const loadMore = async (type) => {
    if (isValidSession()) {
      const { dispatch, albums, artists, playlist } = props;
      setIsLoading(true);
      switch (type) {
        case "albums":
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case "artists":
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case "playlist":
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const {
    albums,
    artists,
    playlist,
    myplaylists,
    tracks,
    trackfeatures,
  } = props;
  const result = {
    albums,
    artists,
    playlist,
    myplaylists,
    tracks,
    trackfeatures,
  };
  console.log(result);

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Navbar className="color-nav" variant="dark">
            <Navbar.Brand
              href="/dashboard"
              style={{ fontSize: "2.2rem", fontWeight: "bold", color: "white" }}
            >
              Spotify Sorter
            </Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            <SearchForm handleSearch={handleSearch} />
          </Navbar>

          <Loader show={isLoading}>Loading...</Loader>
          <SearchResult
            result={result}
            loadMore={loadMore}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            isValidSession={isValidSession}
          />
          <h2 className="main-heading">My Playlists</h2>
          <PlaylistResult result={result} handleTracks={handleTracks} />
          <h2 className="main-heading"> Your Tracks</h2>
          <TrackResult result={result} />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: {
              session_expired: true,
            },
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist,
    myplaylists: state.myplaylists,
    tracks: state.tracks,
    trackfeatures: state.trackfeatures,
  };
};

export default connect(mapStateToProps)(Dashboard);
