import { useEffect } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageContainer = ({ title, children, breadcrumbs }) => {
  useEffect(() => {
    if (title) {
      document.title = `${process.env.REACT_APP_NAME} - ${title}`;
    } else {
      document.title = process.env.REACT_APP_NAME;
    }
  }, [title]);

  return (
    <Container className="mt-4">
      {breadcrumbs && (
        <Breadcrumb>
          {breadcrumbs.map(({ title, to, active }, index) => (
            <Breadcrumb.Item
              key={index}
              linkAs={Link}
              linkProps={{ to }}
              active={active}
            >
              {title}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      {breadcrumbs && <hr></hr>}
      <div>{children}</div>
    </Container>
  );
};

export default PageContainer;
