import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RowStyled } from "styles/Table.styled";

const NameValueRow = ({ name, value, linkTo, sm }) => (
  <RowStyled>
    <Col sm={sm ? sm : 2}>{name}</Col>
    <Col>
      <span className="fw-bold">
        {linkTo ? <Link to={linkTo}>{value}</Link> : value}
      </span>
    </Col>
  </RowStyled>
);

export default NameValueRow;
