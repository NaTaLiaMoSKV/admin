import { useParams } from "react-router-dom";
import { useGetThemeQuery } from "../../redux/courseApi";
import PageContainer from "components/PageContainer";
import ThemeHeader from "./ThemeHeader";
import { useState } from "react";
import ThemeContent from "./ThemeContent";
import ThemeHomework from "./ThemeHomework";
import Loader from "components/Loader";

const ThemePage = () => {
  const [skip, setSkip] = useState(false);
  const params = useParams();
  const {
    data: theme,
    isFetching,
    isLoading,
  } = useGetThemeQuery(params.id, { skip });

  return (
    <PageContainer
      title={theme?.title ?? "Theme"}
      breadcrumbs={[
        { title: "Courses", to: "/courses" },
        { title: `${theme?.course.title}`, to: `/courses/${theme?.course.id}` },
        { title: `${theme?.title}`, active: true },
      ]}
    >
      {(isFetching || isLoading) && <Loader />}
      {theme && (
        <>
          <div className="mt-4">
            <ThemeHeader theme={theme} setSkip={setSkip} />
          </div>
          <div className="mt-4">
            <ThemeContent themeId={theme.id} />
          </div>
          <div className="mt-4 mb-4">
            <ThemeHomework themeId={theme.id} />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default ThemePage;
