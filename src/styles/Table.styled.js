import { styled } from "styled-components";
import { Row, Table } from "react-bootstrap";

export const TableStyled = styled(Table)`
  border-radius: 30px;
  font-family: "Helvetica", sans-serif;
  letter-spacing: 0.03em;

  & thead th {
    text-align: center;
    background-color: #282828;
    color: #fafafa;
  }
  & tbody td {
    text-align: center;
    background-color: #fff;
    color: #282828;
  }
`;

export const RowStyled = styled(Row)`
  color: #282828;
  margin-bottom: 5px;
  letter-spacing: 0.03em;
  font-weight: 600;
  font-size: 16px;

  & a {
    color: #282828;
  }

  & a:hover,
  & a:focus,
  & a:active {
    color: #769c7f;
  }
`;
