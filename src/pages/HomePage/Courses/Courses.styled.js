import styled from "styled-components";
import hero from "images/hero.jpg";
import { SectionContainer } from "styles/Section.styled";
import { ReviewContainer } from "../Reviews/Reviews.styled";
import { NavLink } from "react-router-dom";

export const HeroSectionContainer = styled(SectionContainer)`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: nowrap;
    gap: 50px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1600px;
    gap: 50px;
  }
`;

export const CoursesTitle = styled.h1`
  font-size: 38px;
  font-weight: 600;
  margin-top: 15px;

  @media screen and (min-width: 1200px) {
    font-size: 40px;
  }
`;

export const CoursesSubtitle = styled.p`
  font-size: 18px;

  @media screen and (min-width: 1200px) {
    font-size: 16px;
  }
`;

export const CoursesLink = styled(NavLink)`
  padding: 13px 18px;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  color: #fafafa;
  background-color: #8bbb97;
  transition: all 0.3ms ease-in-out;

  &:hover,
  &:focus {
    background-color: #75a280;
    color: #fafafa;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  @media screen and (min-width: 768px) {
    padding: 10px 30px;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 1200px) 
    padding: 13px 35px;
    font-size: 18px;
  }
`;

export const StatList = styled.ul`
  display: flex;
  gap: 15px;

  & li:not(:last-child) {
    padding-right: 15px;
    border-right: 1px solid #8a8a8a;
  }

  & .count {
    font-weight: 700;
    font-size: 27px;
    margin-bottom: 3px;
  }

  & .text {
    font-size: 14px;
    color: #8a8a8a;
  }
`;

export const CourseContainer = styled(ReviewContainer)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    margin: auto;
  }

  @media screen and (min-width: 1200px) {
    width: 500px;
  }
`;

export const CourseWrapper = styled.div`
  width: calc(100% - 40px);
  padding: 10px;
  border: 1px solid #cbc9c9;
  background-color: #fff;
  border-radius: 10px;

  @media screen and (min-width: 768px) {
    width: 300px;
  }

  @media screen and (min-width: 1200px) {
    width: 350px;
  }
`;

export const CourseStyled = styled.div`
  gap: 5px;
  flex: 0 0 100%;
  scroll-snap-align: start;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  position: relative;
  background-image: url(${hero});
  background-size: cover;
  background-position: center;
  height: 300px;
  color: white;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  & * {
    z-index: 5;
  }
`;

export const CourseTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;
