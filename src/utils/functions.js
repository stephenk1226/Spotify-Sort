import axios from 'axios';
export const getParamValues = (url) => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});
};
export const setAuthHeader = () => {
  try {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${params.access_token}`;
    }
  } catch (error) {
    console.log('Error setting auth', error);
  }
};

export function getIDs(tracks){
  if(tracks !== undefined){
    const ids = tracks.map((track) => track.track.id);
    var result = ids.join(",");
    return result;
  }
}

export function mergeArrays(tracks, trackf){
  const resultArray = [];
  if(tracks.length < 0 || trackf.length < 1){
    return;
  }
  else{
    for(var i = 0; i<tracks.length; i++ ){
      let track = {id: trackf[i].id, name: tracks[i].track.name, url:tracks[i].track.external_urls.spotify, image:tracks[i].track.album.images[0].url, artist:tracks[i].track.album.artists[0].name, artistId:tracks[i].track.artists[0].id, danceability:trackf[i].danceability, energy:trackf[i].energy, key:trackf[i].key, tempo:trackf[i].tempo }
      resultArray.push(track);
    }
  }
  return resultArray;
}

export function changekey(key){
  switch(key){
    case 0:
      return"C";
    case 1:
      return"C#, Db";
    case 2:
      return"D";    
    case 3: 
      return "D♯, E♭ ";
    case 4:
      return "E";
    case 5:
      return "F";
    case 6:
      return "F♯, G♭" ;
    case 7: 
      return "G";  
    case 8:
      return "G♯, A♭";  
    case 9:
      return "A";
    case 10: 
      return "A♯, B♭";
    case 11:
      return "B";      
    default:
      return "No Key Found" ;
  }
}