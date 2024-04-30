import { Alert } from "react-bootstrap";
import styled from "styled-components";

export const MessageStyled = styled(Alert)`
  border: none;
  letter-spacing: 0.03em;

  &[attr="primary"] {
    background-color: #e0d8cd;
    border-radius: 20px 20px 0 20px;
  }
  &[attr="secondary"] {
    background-color: white;
    border-radius: 20px 20px 20px 0;
  }

  & small {
    font-style: italic;
    font-size: 12px;
    letter-spacing: 0.03em;
    color: #9e9e9e;
  }

  & p {
    margin-bottom: 10px;
  }
`;
