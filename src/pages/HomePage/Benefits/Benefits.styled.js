import styled from "styled-components";

export const ExploreContainer = styled.div`
  padding: 15px 30px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 30px;
  background-color: #fff;

  & p {
    color: #8bbb97;
    font-size: 14px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;

  & .subtitleText {
    padding-left: 12px;
    color: #929090;
    border-left: 3px solid #8bbb97;
  }

  @media screen and (min-width: 768px) {
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;

    & .subtitleText {
      font-size: 16px;
      width: 350px;
    }
  }

  @media screen and (min-width: 1200px) {
    justify-content: space-around;

    & .subtitleText {
      width: 500px;
    }
  }
`;

export const BenefitsList = styled.ul`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;

  @media screen and (min-width: 768px) {
    margin-top: 30px;
    flex-wrap: nowrap;
    gap: 15px;
  }
`;

export const BenefitsItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 10px;
  background-color: #f9f7f7;
  border-radius: 10px;
  padding: 10px 10px 15px;

  & p {
    font-size: 14px;
  }

  @media screen and (min-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border-radius: 10px;
      padding: 15px;
    }
  }
`;

export const BenefitsImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  padding: 10px;

  & img {
    width: 30px;
    border-radius: 50%;
  }
`;
