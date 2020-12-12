import React from "react";
import styled from "styled-components";
import { COLORS } from "../../resources/COLORS";

export default ({ children, onClick }) => (
  <CardContainer onClick={onClick}>{children}</CardContainer>
);

const CardContainer = styled.div`
  flex-direction: column;
  display: flex;
  border-color: ${COLORS.grey};
  border-width: thick;
  border-style: solid;
  background-color: ${COLORS.mainBlue};
  padding: 1rem;
  color: ${COLORS.white};
  cursor: pointer;
  :hover {
    background-color: ${COLORS.secondaryBlue};
  }
`;
