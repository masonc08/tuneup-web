import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../services/context';
import PaddedContaainer from '../../components/PaddedContainer';
import MusicCard from '../../components/MusicCard';
import DisplayGrid from '../../components/DisplayGrid';
import { getCategories } from '../../services/spotify';


const Offline = () => {
  const [ state, _ ] = useGlobalState();
  const [ categories, setCategories ] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categories, err } = await getCategories(state.key);
      if (err) {
        console.log("Could not retrieve categories");
        setCategories([]);
      } else {
        setCategories(categories);
        console.log(categories);
      }
    };
    fetchCategories();
  }, []);
  const categoryCards = categories.map((category, i) => (
    <MusicCard
      key={i}
      id={category.id}
      img={category.image || category.icons[0].url}
      name={category.name}
      onPress={() => {}}
    />
  ));

  return (
    <div>
      <PaddedContaainer>
        Offline
      </PaddedContaainer>
      <DisplayGrid>
        { categoryCards }
      </DisplayGrid>
    </div>
  );
}

export default Offline;
