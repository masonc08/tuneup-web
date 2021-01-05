import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ReactAudioPlayer from 'react-audio-player';
import StyledModal from "../../../components/StyledModal";
import MusicCard from "../../../components/MusicCard";
import Button from "react-bootstrap/Button";

const Play = ({ songs }) => {
  const [showModal, setShowModal] = useState(true);
  const [currentSong, setCurrentSong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const playerIsReady = useRef(false);
  const history = useHistory();
  const player = useRef(null);
  useEffect(() => {
    console.log(songs);
  }, []);
  const onModalStart = () => {
    setShowModal(false);
    player.current.audioEl.current.play();
  };

  const onModalBack = () => {
    setShowModal(false);
    history.goBack();
  };

  const getTrackTimeLeft = player => {
    return Math.round(30-player.current.audioEl.current.currentTime);
  };  

  const getSongSrc = id => songs.shuffledSongs[id].preview_url;

  return (
    <GameContainer>
      <StyledModal show={showModal}>
        <StyledModal.Header>
          <StyledModal.Title>Get ready!</StyledModal.Title>
        </StyledModal.Header>
        <StyledModal.Body>
          You selected:
          <center>
            <MusicCard img={songs.playlistImg} name={songs.playlistName} isButton={false} />
          </center>
        </StyledModal.Body>
        <StyledModal.Footer>
          <Button variant="secondary" onClick={onModalBack}>
            Back
          </Button>
          <Button variant="primary" onClick={onModalStart}>
            Start Game
          </Button>
        </StyledModal.Footer>
      </StyledModal>
      <ReactAudioPlayer
        ref={element => player.current = element}
        src={getSongSrc(currentSong)}
        onCanPlayThrough={() => {
          playerIsReady.current = true;
        }}
        listenInterval={1000}
        onListen={() => setTimeLeft(getTrackTimeLeft(player))}
      />
      <GraphicContainer>
        GraphicContainer
      </GraphicContainer>
      <OptionsContainer>
        A, B, C, D
      </OptionsContainer>
    </GameContainer>
  );
};

const GraphicContainer = styled.div`
  flex: 8;
`;

const OptionsContainer = styled.div`
  flex: 2;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default Play;
