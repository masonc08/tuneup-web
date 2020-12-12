import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Play = ({ selectedSongs }) => {
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {}, []);
  return (
    <GameContainer>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {}}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
