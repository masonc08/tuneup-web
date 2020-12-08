import { ENV } from '../../config';


export const getCategories = (token, setCategories) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(ENV + "v1/spotify/get_categories?key=" + token, requestOptions)
    .then(response => response.json())
    .then(result => {
      const items = result.categories.items;
      setCategories(items);
    })
    .catch(error => console.error('Failed to get categories: ', error));
};


export const getPlaylistsFromCategory = async (token, id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const response = await fetch(ENV + "v1/spotify/get_playlists_from_category?key=" + token + 
  "&id=" + id, requestOptions)
  if (response.ok) {
    return response.json();
  }
  throw response.status;
}


export const getSongsFromPlaylist = async (token, id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  try {
    const response = await fetch(ENV + "v1/spotify/get_playlist?key=" + token + "&id=" + id, requestOptions)
    return response.json();
  } catch(error) {
    console.error('error', error);
  }
};


export const searchPlaylists = (token, value, setResults) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(ENV + "v1/spotify/playlist_search?key=" + token + "&q=" + value, requestOptions)
    .then(response => response.json())
    .then(result => {
      const items = result.playlists;
      setResults(items);
    })
    .catch(error => console.error('Failed to query: ', error));
}


export const getSpotifyToken = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  try {
    // TODO: Remove hardcode for token
    // const resp = await fetch(ENV + "v1/spotify/authorize", requestOptions);
    // const token = resp.json().access_token;
    const token = "abc123sampletoken";
    console.log("Successfully authenticated with token " + token);
    return _createOutput(token);
  } catch (error) {
    console.log("Failed to authenticate");
    return _createOutput(undefined, error);
  }
};


const _createOutput = (data, error) => ({
  data: data,
  error: error
});