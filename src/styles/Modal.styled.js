import { styled } from "styled-components";
import { Modal } from "react-bootstrap";

export const ModalStyled = styled(Modal)`
  & button:focus {
    outline: none;
  }

  & .modal-content {
    padding: 10px 20px;
  }

  & .modal-body {
    margin: 10px 0px;
  }
`;

export const EditorModalStyled = styled(Modal)`
  & .modal-dialog {
    max-width: 800px;
  }

  & .modal-content {
    padding: 10px 20px;
  }

  & .modal-body {
    margin: 10px 0px;
  }
`;
