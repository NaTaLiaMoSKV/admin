import PageContainer from "components/PageContainer";
import UserTableRow from "components/UserTableRow";
import UserModalForm from "components/UserModalForm";
import {
  useAddTeacherMutation,
  useGetTeachersQuery,
  useUpdateTeacherMutation,
} from "../../redux/teacherApi";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";
import { useModalFormState } from "hooks/useModalFormState";
import useFilter from "hooks/useFilter";
import FilterInput from "components/FilterInput";
import { useState } from "react";
import PaginationBlock from "components/PaginationBlock";
import { useGetGroupsQuery } from "../../redux/groupApi";

const getTeacherFields = (teacher) => [teacher.name, teacher.email];

const TeachersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: teachers, isFetching, isLoading } = useGetTeachersQuery();
  const { data: groups } = useGetGroupsQuery();
  const [filter, setFilter, filteredTeachers] = useFilter(
    teachers,
    getTeacherFields
  );

  const teachersPerPage = 7;
  const totalPages = Math.ceil(teachers?.length / teachersPerPage);

  const getCurrentPageTeachers = () => {
    if (!teachers) return [];
    const startIndex = (currentPage - 1) * teachersPerPage;
    const endIndex = startIndex + teachersPerPage;
    return filteredTeachers.slice(startIndex, endIndex);
  };

  const [addForm, openAddForm, closeAddForm] = useModalFormState();

  return (
    <PageContainer title={"Teachers"}>
      {(isFetching || isLoading) && <Loader />}
      <div className="m-4">
        <FilterInput value={filter} setValue={setFilter} />
      </div>
      <div className="m-4">
        {filteredTeachers.length > 0 && (
          <TableStyled hover>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Groups</th>
              </tr>
            </thead>
            <tbody>
              {teachers &&
                getCurrentPageTeachers().map((user) => (
                  <UserTableRow key={user.id} user={user} groups={groups} />
                ))}
            </tbody>
          </TableStyled>
        )}
        {filteredTeachers.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "15px" }}>
            No teachers
          </h5>
        )}

        <div className="d-flex justify-content-between">
          <button onClick={openAddForm} className="action-btn">
            Add
          </button>
          {filteredTeachers.length > teachersPerPage && (
            <PaginationBlock
              page={currentPage}
              setPage={setCurrentPage}
              pages={totalPages}
            />
          )}
        </div>
      </div>
      {addForm && (
        <UserModalForm
          title="Add new teacher"
          useAddMutation={useAddTeacherMutation}
          useUpdateMutation={useUpdateTeacherMutation}
          handleClose={closeAddForm}
        />
      )}
    </PageContainer>
  );
};

export default TeachersPage;
