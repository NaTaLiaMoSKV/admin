import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Loader from "components/Loader";
import { FaRegStar } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import { NavButton, ReviewContainer, ReviewStyled } from "./Reviews.styled";
import { SectionDescription, SectionTitle } from "../Homepage.styled";
import { SectionContainer } from "styles/Section.styled";
import { useGetDisplayedReviewsQuery } from "../../../redux/userApi";

const MessageRating = styled.div`
  display: flex;
`;

const StarIcon = styled(FaRegStar)`
  width: 12px;
  height: 12px;
  color: ${({ filled }) => (filled ? "gold" : "gray")};
`;

const Reviews = () => {
  const {
    data: reviews,
    isLoading,
    isFetching,
  } = useGetDisplayedReviewsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewContainerRef = useRef(null);

  useEffect(() => {
    if (reviewContainerRef.current) {
      reviewContainerRef.current.scrollTo({
        left: currentIndex * reviewContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, reviews.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <section style={{ backgroundColor: "#fafafa" }}>
      <SectionContainer>
        {(isLoading || isFetching) && <Loader />}
        <SectionDescription>Testimonials</SectionDescription>
        <SectionTitle>Our Student Testimonials</SectionTitle>
        <ReviewContainer ref={reviewContainerRef}>
          {reviews?.map((review, i) => (
            <ReviewStyled key={i}>
              <div className="image-wrapper">
                <img
                  alt="user"
                  src={
                    review.user.image
                      ? `${process.env.REACT_APP_BASE_URL}/images/${review.user.image}`
                      : "/user.png"
                  }
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h4>{review.user.name}</h4>
              <MessageRating>
                {[...Array(5)].map((_, index) => (
                  <StarIcon key={index} filled={index < (review.rating || 5)} />
                ))}
              </MessageRating>
              <p>{review.text}</p>
            </ReviewStyled>
          ))}
        </ReviewContainer>
        <div className="d-flex justify-content-between">
          <NavButton onClick={handlePrev} disabled={currentIndex === 0}>
            <GrPrevious />
          </NavButton>
          <NavButton
            onClick={handleNext}
            disabled={currentIndex === reviews?.length - 1}
          >
            <GrNext />
          </NavButton>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Reviews;
