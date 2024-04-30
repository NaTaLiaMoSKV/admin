import { Pagination } from "react-bootstrap";
import styled from "styled-components";

export const PaginationStyled = styled(Pagination)`
  & .page-item.active {
    background-color: #8bbb97;
    color: #fafafa;
  }

  & .page-item.active .page-link {
    background-color: transparent;
    color: #fafafa;
    border: none;
  }

  & .page-link {
    color: black;
  }

  & .page-link:focus {
    box-shadow: none;
  }
`;
