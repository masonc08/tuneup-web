import React from "react";
import styled from "styled-components";
import { COLORS } from "../../resources/COLORS";

export default ({ children, onClick, onHover }) => (
  <CardContainer
    onHover={onHover === undefined ? true : onHover}
    onClick={onClick}
  >
    {children}
  </CardContainer>
);

const CardContainer = styled.div`
  flex-direction: column;
  display: block;
  border-color: ${COLORS.grey};
  border-width: thick;
  border-style: solid;
  background-color: ${COLORS.mainBlue};
  padding: 1rem;
  color: ${COLORS.white};
  cursor: pointer;
  :hover {
    ${(props) => props.onHover && `background-color: ${COLORS.secondaryBlue}`};
  }
`;
