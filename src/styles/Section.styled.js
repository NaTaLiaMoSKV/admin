import styled from "styled-components";

export const SectionContainer = styled.div`
  position: relative;
  width: calc(100% - 40px);
  padding: 30px 0;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 480px) {
    width: 440px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 768px) {
    width: 704px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 1200px) {
    width: calc(100% - 64px);
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }
`;
