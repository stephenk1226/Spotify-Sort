import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchResult from "./SearchResult";
import PlaylistResult from "./PlaylistResult";
import RecommendResult from "./RecommendResult";
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
  getRecommendations
} from "../actions/result";
import Loader from "./Loader";
import _ from 'lodash';

const Dashboard = (props) => {

  useEffect(()=>{
    props.dispatch(initiateGetPlaylists());
  },[props.tracks]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("albums");
  const { isValidSession, history } = props;
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

  const handleTracks =  async (url) => {
    if (isValidSession()) {
      setIsLoading(true);
      await props.dispatch(initiateGetTracks(url))
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


  const handleRecommendations =  async (seed_track, seed_artist, key, tempo, energy, dance) => {
    if (isValidSession()) {
      setIsLoading(true);
      await props.dispatch(getRecommendations(seed_track, seed_artist, key, tempo, energy, dance))
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

 

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Navbar className="color-nav" variant="dark">
            <Navbar.Brand
              href="/dashboard"
              style={{ fontSize: "2.2rem", fontWeight: "bold", color: "white" }}
            >
              Sortify
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
          { _.isEmpty(tracks) ? '' :
            <TrackResult result={result} handleRecommendations={handleRecommendations}/>
          }
          { _.isEmpty(trackfeatures) ? '' :
            <RecommendResult result={result} />
          }
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
