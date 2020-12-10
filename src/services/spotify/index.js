import { ENV } from '../../config';


export const getCategories = async token => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  try {
    const resp = await _fetchSuccessfully(ENV + "v1/spotify/get_categories?key=" + token, requestOptions);
    const jsonResp = await resp.json();
    const items = jsonResp.categories.items;
    console.log("Successfully fetched categories");
    return _createOutput(items);
  } catch (error) {
    console.log("Failed to fetch categories");
    return _createOutput(undefined, error);
  }
};

export const getPlaylistsFromCategory = async (token, id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  try {
    const resp = await _fetchSuccessfully(ENV + "v1/spotify/get_playlists_from_category?key=" + token + 
    "&id=" + id, requestOptions);
    const jsonResp = await resp.json();
    const items = jsonResp.playlists;
    return _createOutput(items);
  } catch (error) {
    return _createOutput(undefined, error);
  }
}


export const getSongsFromPlaylist = async (token, id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  try {
    const resp = await _fetchSuccessfully(ENV + "v1/spotify/get_playlist?key=" + token + "&id=" + id, requestOptions)
    const jsonResp = await resp.json();
    return _createOutput(jsonResp);
  } catch(error) {
    console.error('error', error);
  }
};


export const searchPlaylists = (token, value, setResults) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  _fetchSuccessfully(ENV + "v1/spotify/playlist_search?key=" + token + "&q=" + value, requestOptions)
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
    const resp = await _fetchSuccessfully(ENV + "v1/spotify/authorize", requestOptions);
    const jsonResp = await resp.json();
    const token = jsonResp.access_token;
    console.log("Successfully authenticated with token " + token);
    return _createOutput(token);
  } catch (error) {
    console.log("Failed to authenticate");
    return _createOutput(undefined, error);
  }
};


const _createOutput = (data, error) => ({ data, error });

const _fetchSuccessfully = async (...params) => {
  const resp = await fetch(...params);
  if (!resp.ok) {
    throw resp.ok;
  }
  return resp
};
