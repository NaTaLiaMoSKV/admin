import { useEffect, useRef, useState } from "react";
import {
  CourseContainer,
  CourseStyled,
  CourseTitle,
  CoursesLink,
  CoursesSubtitle,
  CoursesTitle,
  HeroSectionContainer,
  StatList,
} from "./Courses.styled";
import { NavButton } from "../Reviews/Reviews.styled";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useGetUnauthorizedCoursesQuery } from "../../../redux/userApi";
import Loader from "components/Loader";

const Courses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewContainerRef = useRef(null);

  const {
    data: courses,
    isLoading,
    isFetching,
  } = useGetUnauthorizedCoursesQuery();

  useEffect(() => {
    if (reviewContainerRef.current) {
      reviewContainerRef.current.scrollTo({
        left: currentIndex * reviewContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, courses?.length - 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <section style={{ backgroundColor: "#fafafa" }}>
      {(isLoading || isFetching) && <Loader />}
      <HeroSectionContainer>
        <div className="d-flex flex-column align-items-start gap-4">
          <CoursesTitle>
            Unlock Your Potential with Our Diverse Learning Platform{" "}
          </CoursesTitle>
          <CoursesSubtitle>
            Delivering Comfort as a Priority: Quick and Easy Access to a Wide
            Variety of Furniture
          </CoursesSubtitle>
          <CoursesLink as={Link} to="/login">
            Sign In
          </CoursesLink>
          <StatList>
            <li>
              <p className="count">20+</p>
              <p className="text">Courses</p>
            </li>
            <li>
              <p className="count">500+</p>
              <p className="text">Customers</p>
            </li>
            <li>
              <p className="count">4.9+</p>
              <p className="text">Review Rating</p>
            </li>
          </StatList>
        </div>
        <div>
          <CourseContainer className="d-flex gap-4" ref={reviewContainerRef}>
            {courses?.map((course, index) => (
              <CourseStyled key={index}>
                <CourseTitle>{course.title}</CourseTitle>
                <p>{course.description}</p>
              </CourseStyled>
            ))}
          </CourseContainer>
          <div className="d-flex justify-content-between">
            <NavButton onClick={handlePrev} disabled={currentIndex === 0}>
              <GrPrevious />
            </NavButton>
            <NavButton
              style={{ marginRight: "20px" }}
              onClick={handleNext}
              disabled={currentIndex === courses?.length - 1}
            >
              <GrNext />
            </NavButton>
          </div>
        </div>
      </HeroSectionContainer>
    </section>
  );
};

export default Courses;
