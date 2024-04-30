import { Alert } from "react-bootstrap";
import styled from "styled-components";

export const QuestionStyled = styled(Alert)`
  background-color: #fafafa;
  border: none;
  border-radius: 10px;
  letter-spacing: 0.03em;
  margin-bottom: 0;

  & .question-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .answer {
    font-size: 14px;
    font-style: italic;
    margin-bottom: 5px;
    letter-spacing: 0.04em;
  }

  & hr {
    color: black;
  }
`;

export const QuestionButton = styled.button`
  padding: 8px;

  &:hover svg {
    fill: black;
  }
`;
