import styled from "styled-components";

export const ReviewContainer = styled.div`
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ReviewStyled = styled.div`
  gap: 5px;
  flex: 0 0 100%;
  scroll-snap-align: start;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .image-wrapper {
    display: flex;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  & h4 {
    font-size: 20px;
    font-weight: bold;
  }

  & p {
    max-width: 80%;
    text-align: center;
    margin-top: 10px;
  }

  & img {
    border-radius: 50%;
    padding: 10px;
    width: 200px;
  }
`;

export const NavButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 50%;
  background-color: #8bbb97;

  & svg {
    color: #fafafa;
  }

  &:hover {
    background-color: #769c7f;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    border: 2px solid #d3d3d3;
    background-color: #fafafa;
  }

  &:disabled svg {
    color: #d3d3d3;
  }

  &:disabled:hover,
  &:disabled:focus {
    border: 2px solid #d3d3d3;
    background-color: transparent;
    box-shadow: none;
    cursor: auto;
  }
`;
