import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { useGlobalState } from '../../services/context';
import MusicCard from '../../components/MusicCard';
import DisplayGrid from '../../components/DisplayGrid';
import { getCategories, getPlaylistsFromCategory } from '../../services/spotify';


const Offline = () => {
  const [ state, _ ] = useGlobalState();
  const [ selectionStage, setSelectionStage ] = useState(0);
  const [ data, setData ] = useState([]);
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
        return () => {
          history.push('/offline/play');
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
  const categoryCards = data.map((category, i) => (
    <div key={i} onClick={() => getNextAction()(category.id)}>
      <MusicCard
        img={category.image || category.icons[0].url}
        name={category.name}
      />
    </div>
  ));


  return (
    <Router>
      <Switch>
        <Route exact path="/offline">
          <DisplayGrid>
            { categoryCards }
          </DisplayGrid>
        </Route>
        <Route exact path="/offline/play">
          Selected
        </Route>
      </Switch>
    </Router>
  );
}

export default Offline;
