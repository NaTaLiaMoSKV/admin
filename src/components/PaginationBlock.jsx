import { useMemo, useState } from "react";
import { Pagination } from "react-bootstrap";
import { PaginationStyled } from "styles/Pagination.styled";

const createItems = (current, pages) => {
  switch (current) {
    case 1:
    case 2:
      return [1, 2, 3, -1, pages];
    case 3:
      return [1, 2, 3, 4, -1, pages];
    case pages:
    case pages - 1:
      return [1, -1, pages - 2, pages - 1, pages];
    case pages - 2:
      return [1, -1, pages - 3, pages - 2, pages - 1, pages];
    default:
      return [1, -1, current - 1, current, current + 1, -1, pages];
  }
};

const PaginationBlock = ({ pages, page = 1, setPage }) => {
  const [current, setCurrent] = useState(page);

  const items = useMemo(() => {
    if (!pages || pages <= 1) {
      return [];
    }
    if (pages > 7) {
      return createItems(current, pages);
    } else {
      return Array.from({ length: pages }, (v, i) => i + 1);
    }
  }, [pages, current]);

  const handleClick = (n) => {
    setCurrent(n);
    setPage(n);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <PaginationStyled>
      {items.length &&
        items.map((n, index) =>
          n === -1 ? (
            <Pagination.Ellipsis disabled />
          ) : (
            <Pagination.Item
              key={index}
              onClick={() => handleClick(n)}
              active={n === current}
            >
              {n}
            </Pagination.Item>
          )
        )}
    </PaginationStyled>
  );
};

export default PaginationBlock;
