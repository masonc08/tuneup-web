import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ReactAudioPlayer from 'react-audio-player';
import StyledModal from "../../../components/StyledModal";
import MusicCard from "../../../components/MusicCard";
import ButtonCard from "../../../components/ButtonCard";
import { MIN_SONGS } from "../../../config";
import Button from "react-bootstrap/Button";

const Play = ({ songs }) => {
  const [showModal, setShowModal] = useState(true);
  const [currentSong, setCurrentSong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
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
  const getChoice = (id, i) => {
    const choiceID = songs.shuffledSongs[id].options[i];
    return songs.shuffledSongs[choiceID].name;
  };
  const isCorrectAnswer = option => currentSong == songs.shuffledSongs[currentSong].options[option];
  const handlePress = async option => {
    if (isCorrectAnswer(option)) {
      setScore(pre => pre + 1);
    }
    nextRound();
  };
  const nextRound = async () => {
    if (currentSong === MIN_SONGS) {
      player.current.audioEl.current.pause();
      history.goBack();
    }
    setCurrentSong(pre => pre + 1);
    await player.current.audioEl.current.load();
    await player.current.audioEl.current.play();
  };

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
          console.log(playerIsReady.current)
        }}
        listenInterval={1000}
        onListen={() => setTimeLeft(getTrackTimeLeft(player))}
      />
      {'Your Score: ' + score + '     Time Left: ' + timeLeft}
      <GraphicContainer>
        <MusicCard img={songs.playlistImg} name={songs.playlistName} isButton={false} />
      </GraphicContainer>
      <OptionsContainer>
        <ButtonCard onClick={ () => handlePress(0)}>
          {getChoice(currentSong, 0)}
        </ButtonCard>
        <ButtonCard onClick={ () => handlePress(1) }>
          {getChoice(currentSong, 1)}
        </ButtonCard>
        <ButtonCard onClick={ () => handlePress(2) }>
          {getChoice(currentSong, 2)}
        </ButtonCard>
        <ButtonCard onClick={ () => handlePress(3) }>
          {getChoice(currentSong, 3)}
        </ButtonCard>
      </OptionsContainer>
    </GameContainer>
  );
};

const GraphicContainer = styled.div`
  flex: 8;
  margin: 1em;
  display-item
`;

const OptionsContainer = styled.div`
  flex: 2;
  display: contents;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default Play;
