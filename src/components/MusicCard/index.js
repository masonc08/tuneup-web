import React from 'react'
import styled from 'styled-components';
import ButtonCard from '../ButtonCard';


const MusicCard = ({ img, name }) => {
  return (
    <ButtonCard>
      <ImageContainer>
        <img src={img} width="300" height="300"/>
      <NameContainer>
        {name}
      </NameContainer>
      </ImageContainer>
    </ButtonCard>
  )
}

const NameContainer = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  z-index: 10;
  margin: auto;
  transform:translate(-50%, -50%);
`;

const ImageContainer = styled.div`
  position: relative;
`;

export default MusicCard
