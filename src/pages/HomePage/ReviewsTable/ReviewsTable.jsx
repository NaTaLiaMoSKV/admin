import Loader from "components/Loader";
import { useGetAllReviewsQuery } from "../../../redux/userApi";
import { TableStyled } from "styles/Table.styled";
import { gateDateTimeString } from "utils/dateUtils";
import { useModalFormState } from "hooks/useModalFormState";
import ReviewModal from "./ReviewModal";
import ReviewRating from "./ReviewRating";
import { PiCheckBold } from "react-icons/pi";
import { useState } from "react";
import PaginationBlock from "components/PaginationBlock";

const ReviewTableRow = ({ review }) => {
  const [reviewForm, openReviewForm, closeReviewForm] = useModalFormState();

  return (
    <>
      <tr onClick={openReviewForm} style={{ cursor: "pointer" }}>
        <td>{gateDateTimeString(review.createdAt)}</td>
        <td>{review.user.name}</td>
        <td
          style={{
            maxWidth: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "15px",
          }}
        >
          {review.text}
        </td>
        <td>{review.rating ? <ReviewRating count={review.rating} /> : "-"}</td>
        <td>{review.display ? <PiCheckBold /> : ""}</td>
      </tr>
      {reviewForm && (
        <ReviewModal review={review} handleClose={closeReviewForm} />
      )}
    </>
  );
};

const ReviewsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDisplayedReviews, setIsDisplayedReviews] = useState(false);
  const { data: reviews, isLoading, isFetching } = useGetAllReviewsQuery();

  const reviewsPerPage = 8;
  const totalPages = Math.ceil(reviews?.length / reviewsPerPage);

  const toggleDisplayedReviews = () => {
    setIsDisplayedReviews((prevState) => !prevState);
  };

  const displayedReviews = reviews?.filter((r) => r.display === true);

  const getCurrentPageReviews = () => {
    if (!reviews) return [];

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return reviews.slice(startIndex, endIndex);
  };

  return (
    <>
      {(isLoading || isFetching) && <Loader />}
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ position: "relative" }}
      >
        <button
          className="action-btn"
          variant="outline-secondary"
          onClick={toggleDisplayedReviews}
        >
          {isDisplayedReviews ? "Show all" : "Show displayed"}
        </button>
        {!isDisplayedReviews && (
          <PaginationBlock
            page={currentPage}
            setPage={setCurrentPage}
            pages={totalPages}
          />
        )}
      </div>
      {reviews && reviews.length > 0 && (
        <TableStyled hover>
          <thead>
            <tr>
              <th style={{ width: "220px" }}>Date</th>
              <th>User</th>
              <th>Text</th>
              <th style={{ width: "120px" }}>Rating</th>
              <th>Display</th>
            </tr>
          </thead>
          <tbody>
            {isDisplayedReviews
              ? displayedReviews.map((review) => (
                  <ReviewTableRow key={review.id} review={review} />
                ))
              : getCurrentPageReviews().map((review) => (
                  <ReviewTableRow key={review.id} review={review} />
                ))}
            {/* {getCurrentPageReviews().map((review) => (
              <ReviewTableRow key={review.id} review={review} />
            ))} */}
          </tbody>
        </TableStyled>
      )}
    </>
  );
};

export default ReviewsTable;
