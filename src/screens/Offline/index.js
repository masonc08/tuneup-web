import React, { useEffect, useState, useRef } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useGlobalState } from '../../services/context';
import MusicCard from '../../components/MusicCard';
import DisplayGrid from '../../components/DisplayGrid';
import { getCategories, getPlaylistsFromCategory, getSongsFromPlaylist } from '../../services/spotify';
import { MIN_SONGS } from '../../config';
import { formatSongs } from './logic';
import Play from './Play';


const Offline = () => {
  const match = useRouteMatch();
  const [ state, _ ] = useGlobalState();
  const [ selectionStage, setSelectionStage ] = useState(0);
  const [ data, setData ] = useState([]);
  const selectedSongs = useRef();
  const history = useHistory();
  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categories, err } = await getCategories(state.key);
      if (err) {
        console.log("Could not retrieve categories");
        setData([]);
      } else {
        setData(categories);
      }
    };
    fetchCategories();
  }, []);
  const getNextAction = () => {
    switch (selectionStage) {
      case 0:
        return fetchPlaylists;
      case 1:
        return async (...args) => {
          await handlePlaylistSelection(...args);
          history.push(`${match.url}/play`);
        };
      default:
        console.error(`selectionStage: ${selectionStage} is unknown`);
        break;
    }
  };
  const fetchPlaylists = async id => {
    const { data: playlists, err } = await getPlaylistsFromCategory(state.key, id);
    if (err) {
      console.log("Could not retrieve categories");
    } else {
      setData(playlists);
      setSelectionStage(1);
    }
  };
  const handlePlaylistSelection = async (playlistId, playlistName) => {
    const { data: songs, err } = await getSongsFromPlaylist(state.key, playlistId);
    if (err) {
      console.log("Could not retrieve songs");
    } else if (songs.tracksWithPreview < MIN_SONGS) {
      console.log("This playlist doesn't have enough songs with previews");
    } else {
      const formattedSongs = formatSongs(songs.tracks);
      formattedSongs.playlistName = playlistName;
      console.log("Songs loaded: ", formattedSongs);
      selectedSongs.current = formattedSongs;
    }
  };
  const musicCards = data.map((music, i) => (
    <div key={i} onClick={() => getNextAction()(music.id, music.name)}>
      <MusicCard
        img={music.image || music.icons[0].url}
        name={music.name}
      />
    </div>
  ));


  return (
    <Switch>
      <Route path={`${match.path}/play`}>
        <Play songs={selectedSongs.current}/>
      </Route>
      <Route path={match.path}>
        <DisplayGrid>
          { musicCards }
        </DisplayGrid>
      </Route>
    </Switch>
  );
}

export default Offline;
