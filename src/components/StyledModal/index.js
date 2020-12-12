import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { COLORS } from "../../resources/COLORS";

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${COLORS.grey};
  }
  .modal-header {
    border-bottom-color: ${COLORS.darkgrey};
  }
  .modal-footer {
    border-top-color: ${COLORS.darkgrey};
  }
`;

export default StyledModal;
