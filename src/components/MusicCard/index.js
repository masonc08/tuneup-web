import React from 'react'
import styled from 'styled-components';
import ButtonCard from '../ButtonCard';


const MusicCard = ({ img, name }) => {
  return (
    <ButtonCard>
      <ImageContainer>
        <img src={img} width="300" height="300"/>
      </ImageContainer>
      <NameContainer>
        {name}
      </NameContainer>
    </ButtonCard>
  )
}

const NameContainer = styled.div`
  margin: auto;
`;

const ImageContainer = styled.div`
  position: relative;
`;

export default MusicCard
