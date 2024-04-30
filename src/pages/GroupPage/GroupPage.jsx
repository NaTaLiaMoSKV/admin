import { useParams } from "react-router-dom";
import { useState } from "react";
import PageContainer from "components/PageContainer";
import { useGetGroupQuery } from "../../redux/groupApi";
import GroupHeader from "./GroupHeader";
import GroupStudents from "./GroupStudents";
import GroupLessons from "./GroupLessons";
import Loader from "components/Loader";

const GroupPage = () => {
  const [skip, setSkip] = useState(false);
  const params = useParams();
  const {
    data: group,
    isFetching,
    isLoading,
  } = useGetGroupQuery(params.id, { skip });

  return (
    <PageContainer
      title={group?.name ?? "Group"}
      breadcrumbs={[
        { title: "Groups", to: "/groups" },
        { title: `${group?.name}`, active: true },
      ]}
    >
      {(isFetching || isLoading) && <Loader />}
      {group && (
        <>
          <div className="mt-4">
            <GroupHeader group={group} setSkip={setSkip} />
          </div>
          <div className="mt-4">
            <GroupStudents group={group} />
          </div>
          <div className="mt-4 mb-4">
            <GroupLessons group={group} />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default GroupPage;
