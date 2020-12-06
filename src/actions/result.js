import {
  SET_ALBUMS,
  ADD_ALBUMS,
  SET_ARTISTS,
  ADD_ARTISTS,
  SET_PLAYLIST,
  ADD_PLAYLIST,
  ADD_MY_PLAYLISTS,
  SET_MY_PLAYLISTS,
  SET_TRACKS,
  SET_TRACKS_FEATURES,
} from "../utils/constants";
import { get } from "../utils/api";
import { getIDs, mergeArrays, mergeRecommendedArrays } from "../utils/functions";
export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
});
export const addAlbums = (albums) => ({
  type: ADD_ALBUMS,
  albums,
});
export const setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists,
});
export const addArtists = (artists) => ({
  type: ADD_ARTISTS,
  artists,
});
export const setPlayList = (playlists) => ({
  type: SET_PLAYLIST,
  playlists,
});
export const addPlaylist = (playlists) => ({
  type: ADD_PLAYLIST,
  playlists,
});
export const addMyPlaylist = (myplaylists) => ({
  type: ADD_MY_PLAYLISTS,
  myplaylists,
});
export const setMyPlaylist = (myplaylists) => ({
  type: SET_MY_PLAYLISTS,
  myplaylists,
});
export const setTracks = (tracks) => ({
  type: SET_TRACKS,
  tracks,
});
export const setTracksFeatures = (trackfeatures) => ({
  type: SET_TRACKS_FEATURES,
  trackfeatures,
});

export const initiateGetResult = (searchTerm) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=album,playlist,artist`;
      const result = await get(API_URL);
      console.log(result);
      const { albums, artists, playlists } = result;
      dispatch(setAlbums(albums));
      dispatch(setArtists(artists));
      return dispatch(setPlayList(playlists));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const initiateGetPlaylists = (url) => {
  return async (dispatch) => {
    try {
      const API_URL = "https://api.spotify.com/v1/me/playlists";
      const result = await get(API_URL);
      dispatch(setMyPlaylist(result));
      return;
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const initiateGetTracks = (ids) => {
  return async (dispatch) => {
    try {
      const API_URL = ids;
      const result = await get(API_URL);
      const tracksIds = getIDs(result.items, "T");
      const trackf = await dispatch(initiateGetTracksFeatures(tracksIds));
      const tracks = result.items;
      console.log("TRACKS", tracks);
      const mergedTracks = mergeArrays(tracks, trackf);
      return dispatch(setTracks(mergedTracks));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const initiateGetTracksFeatures = (ids) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/audio-features?ids=${encodeURIComponent(
        ids
      )}`;
      const result = await get(API_URL);
      console.log(result);
      return result.audio_features;
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getRecommendations = (
  trackId,
  artistsId,
  tempo,
  key,
  energy,
  danceability
) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/recommendations?market=US&seed_artists=${encodeURIComponent(
        artistsId
      )}&seed_tracks=${encodeURIComponent(
        trackId
      )}&target_danceability=${encodeURIComponent(
        danceability
      )}&target_energy=${encodeURIComponent(
        energy
      )}&target_key=${encodeURIComponent(key)}&target_tempo=${encodeURIComponent(
        tempo
      )}`;
      console.log("url", API_URL);
      const result = await get(API_URL);
      const tracksIds = getIDs(result.tracks, "R");
      const trackf = await dispatch(initiateGetTracksFeatures(tracksIds));
      const tracks = result.tracks;
      const mergedTracks = mergeRecommendedArrays(tracks, trackf);
      console.log("merged",mergedTracks);
      return dispatch(setTracksFeatures(mergedTracks));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const initiateLoadMoreAlbums = (url) => {
  return async (dispatch) => {
    try {
      console.log("url", url);
      const result = await get(url);
      console.log("categoriess", result);
      return dispatch(addAlbums(result.albums));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const initiateLoadMoreArtists = (url) => {
  return async (dispatch) => {
    try {
      console.log("url", url);
      const result = await get(url);
      console.log("categoriess", result);
      return dispatch(addArtists(result.artists));
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const initiateLoadMorePlaylist = (url) => {
  return async (dispatch) => {
    try {
      console.log("url", url);
      const result = await get(url);
      console.log("categoriess", result);
      return dispatch(addPlaylist(result.playlists));
    } catch (error) {
      console.log("error", error);
    }
  };
};
