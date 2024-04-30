import { useParams } from "react-router-dom";
import PageContainer from "components/PageContainer";
import { useGetLessonQuery } from "../../redux/lessonApi";
import LessonHeader from "./LessonHeader";
import Loader from "components/Loader";

const LessonPage = () => {
  const params = useParams();
  const { data: lesson, isFetching, isLoading } = useGetLessonQuery(params.id);

  return (
    <PageContainer
      title={`Lesson ${lesson?.theme.title}` ?? "Lesson"}
      breadcrumbs={[
        { title: "Groups", to: "/groups" },
        { title: `${lesson?.group.name}`, to: `/groups/${lesson?.group.id}` },
        { title: `${lesson?.theme.title}`, active: true },
      ]}
    >
      {(isFetching || isLoading) && <Loader />}
      {lesson && (
        <>
          <div className="mt-4">
            <LessonHeader lesson={lesson} />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default LessonPage;
