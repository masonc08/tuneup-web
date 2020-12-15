import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ButtonCard from "../ButtonCard";

const MusicCard = ({ img, name, onClick, isButton }) => {
  return (
    <ButtonCard onClick={onClick} isButton={isButton}>
      <ImageContainer src={img} />
      <NameContainer>
        {name}
      </NameContainer>
    </ButtonCard>
  );
};

ButtonCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isButton: PropTypes.bool,
};

ButtonCard.defaultProps = {
  onClick: () => {},
  isButton: true,
};

const NameContainer = styled.div`
  width: 300px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImageContainer = styled.img`
  height: 300px;
  width: 300px;
`;

export default MusicCard;
