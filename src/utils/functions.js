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
  if(tracks.items !== undefined){
    const ids = tracks.items.map((track) => track.track.id);
    var result = ids.join(",");
    return result;
  }
}

export function changekey(key){
  switch(key){
    case 0:
      return"C";
    case 1:
      return"C#";
    case 2:
      return"D";    


    case 7:
      return "seven";  
    default:
      return "No Key Found"  
  }
}