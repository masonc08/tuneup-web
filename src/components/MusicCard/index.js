import React from "react";
import styled from "styled-components";
import ButtonCard from "../ButtonCard";

const MusicCard = ({ img, name, onClick }) => {
  return (
    <ButtonCard onClick={onClick}>
      <ImageContainer src={img} />
      <NameContainer>{name}</NameContainer>
    </ButtonCard>
  );
};

const NameContainer = styled.div`
  width: 300px;
  height: 75px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0.5em;
  font-size: 2vh;
`;

const ImageContainer = styled.img`
  height: 300px;
  width: 300px;
`;

export default MusicCard;
