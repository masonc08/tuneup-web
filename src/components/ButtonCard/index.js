import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLORS } from "../../resources/COLORS";

const ButtonCard = ({ children, onClick, isButton }) => (
  <CardContainer isButton={isButton} onClick={onClick}>
    {children}
  </CardContainer>
);

ButtonCard.propTypes = {
  onClick: PropTypes.func,
  onHover: PropTypes.bool,
};

ButtonCard.defaultProps = {
  onHover: true,
};

const CardContainer = styled.div`
  flex-direction: column;
  display: inline-block;
  border-color: ${COLORS.grey};
  border-width: thick;
  border-style: solid;
  background-color: ${COLORS.mainBlue};
  padding: 1rem;
  color: ${COLORS.white};
  ${props => props.isButton && `cursor: pointer`};
  :hover {
    ${(props) => props.isButton && `background-color: ${COLORS.secondaryBlue}`};
  }
`;

export default ButtonCard;
