import PageContainer from "components/PageContainer";
import { useAuth } from "hooks/useAuth";
import ReviewsTable from "./ReviewsTable/ReviewsTable";
import Courses from "./Courses/Courses";
import Benefits from "./Benefits";
import Reviews from "./Reviews";

const HomePage = () => {
  const { user } = useAuth();
  if (user) {
    document.title = "LMS - Home";
  } else {
    document.title = "LMS";
  }

  return (
    <>
      {user && (
        <PageContainer title={"Home"}>
          <h2 className="text-center">Students messages and feedbacks</h2>
          <ReviewsTable />
        </PageContainer>
      )}
      {!user && (
        <>
          <Courses />
          <Benefits />
          <Reviews />
        </>
      )}
    </>
  );
};

export default HomePage;
