import PageContainer from "components/PageContainer";
import { useNavigate } from "react-router-dom";
import { useGetGroupsQuery } from "../../redux/groupApi";
import GroupModalForm from "components/GroupModalForm";
import { gateDateString } from "utils/dateUtils";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";
import { useModalFormState } from "hooks/useModalFormState";
import useFilter from "hooks/useFilter";
import FilterInput from "components/FilterInput";

const GroupTableRow = ({ group }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${group.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="text-center"
      style={{ cursor: "pointer" }}
    >
      <td>{group.name}</td>
      <td>{group.course.title}</td>
      <td>{gateDateString(group.startsAfter)}</td>
    </tr>
  );
};

const getGroupFields = (group) => [
  group.name,
  group.course.title,
  gateDateString(group.startsAfter),
];

const GroupsPage = () => {
  const { data: groups, isFetching, isLoading } = useGetGroupsQuery();
  const [filter, setFilter, filteredGroups] = useFilter(groups, getGroupFields);
  const [addForm, openAddForm, closeAddForm] = useModalFormState();

  return (
    <PageContainer title={"Groups"}>
      {(isFetching || isLoading) && <Loader />}
      <div className="m-4">
        <FilterInput value={filter} setValue={setFilter} />
      </div>
      <div className="m-4">
        {filteredGroups.length > 0 && (
          <TableStyled hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Start</th>
              </tr>
            </thead>

            <tbody>
              {groups &&
                filteredGroups.map((group) => (
                  <GroupTableRow key={group.id} group={group} />
                ))}
            </tbody>
          </TableStyled>
        )}
        {filteredGroups.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "15px" }}>No groups</h5>
        )}
        <button onClick={openAddForm} className="action-btn">
          Add
        </button>
      </div>
      {addForm && <GroupModalForm handleClose={closeAddForm} />}
    </PageContainer>
  );
};

export default GroupsPage;
