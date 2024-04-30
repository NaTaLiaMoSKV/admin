import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavigationNavbar = styled(Navbar)`
  background-color: #8bbb97;
  color: #fafafa;
  padding: 0;

  & div {
    height: 85px;
  }

  & a,
  & a:hover,
  & a:focus,
  & a:active {
    color: #fafafa;
  }
`;

export const NavigationNavItem = styled(Nav.Item)`
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  padding: 0 10px;
`;

export const NavigationNavLink = styled(NavLink)`
  display: block;
  padding: 30px 0px;
  text-decoration: none;
  color: #fafafa;
  font-weight: 600;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease-in-out;

  &.active {
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 0.04em;
    border-bottom: 3px solid #c4c4c4;
  }
`;
