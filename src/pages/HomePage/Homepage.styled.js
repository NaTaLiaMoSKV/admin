import styled from "styled-components";

export const SectionDescription = styled.p`
  color: #8bbb97;
  font-size: 16px;
  letter-spacing: 0.05em;
  margin-left: 20px;
  position: relative;

  &::before {
    background-color: #8bbb97;
    content: "";
    height: 1px;
    left: -20px;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 10px;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 34px;
  }

  &[attr="benefits"] {
    @media screen and (min-width: 768px) {
      width: 300px;
    }

    @media screen and (min-width: 1200px) {
      width: 450px;
    }
  }
`;
