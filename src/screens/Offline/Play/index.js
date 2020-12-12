import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledModal from "../../../components/StyledModal";
import MusicCard from "../../../components/MusicCard";
import Button from "react-bootstrap/Button";

const Play = ({ songs }) => {
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    console.log(songs);
  }, []);
  return (
    <GameContainer>
      <StyledModal show={showModal}>
        <StyledModal.Header>
          <StyledModal.Title>Get ready!</StyledModal.Title>
        </StyledModal.Header>
        <StyledModal.Body>
          You selected:
          <center>
            <MusicCard img={songs.playlistImg} name={songs.playlistName} />
          </center>
        </StyledModal.Body>
        <StyledModal.Footer>
          <Button variant="secondary" onClick={() => {}}>
            Back
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Start Game
          </Button>
        </StyledModal.Footer>
      </StyledModal>
      Selected
    </GameContainer>
  );
};

const GameContainer = styled.div`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default Play;
