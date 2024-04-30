import { styled } from "styled-components";
import { Card, CardImg } from "react-bootstrap";

export const CardStyled = styled(Card)`
  background-color: #f3f3f3;
  border-radius: 20px;
  padding: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  & .card-header,
  & .card-footer {
    letter-spacing: 0.03em;
    font-style: italic;
    background-color: transparent;
  }

  & .card-img-top {
    border-radius: 50%;
    height: 128px;
    width: 128px;
  }

  & .card-title {
    font-weight: 900;
    letter-spacing: 0.03em;
  }

  & .card-subtitle {
    margin-top: 10px;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  & .card-text {
    margin-top: 5px;
    letter-spacing: 0.03em;
  }

  & .card-body-chat {
    max-height: 400px;
    overflow-y: auto;
  }

  & .card-body-questions {
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const CardImgStyled = styled(CardImg)`
  border: none;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
