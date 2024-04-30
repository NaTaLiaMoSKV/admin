import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../redux/courseApi";
import { useState } from "react";
import PageContainer from "components/PageContainer";
import CourseThemes from "./CourseThemes";
import CourseHeader from "./CourseHeader";
import Loader from "components/Loader";

const CoursePage = () => {
  const [skip, setSkip] = useState(false);
  const params = useParams();
  const {
    data: course,
    isFetching,
    isLoading,
  } = useGetCourseQuery(params.id, { skip });
  return (
    <PageContainer
      title={course?.title ?? "Course"}
      breadcrumbs={[
        { title: "Courses", to: "/courses" },
        { title: `${course?.title}`, active: true },
      ]}
    >
      {(isFetching || isLoading) && <Loader />}

      {course && (
        <>
          <div className="mt-4">
            <CourseHeader course={course} setSkip={setSkip} />
          </div>
          <div className="mt-4 mb-4">
            <CourseThemes />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default CoursePage;
