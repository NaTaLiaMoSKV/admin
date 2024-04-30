import PageContainer from "components/PageContainer";
import UserTableRow from "components/UserTableRow";
import UserModalForm from "components/UserModalForm";
import {
  useAddStudentMutation,
  useGetStudentsQuery,
  useUpdateStudentMutation,
} from "../../redux/studentApi";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";
import { useModalFormState } from "hooks/useModalFormState";
import useFilter from "hooks/useFilter";
import FilterInput from "components/FilterInput";
import { useState } from "react";
import PaginationBlock from "components/PaginationBlock";

const getStudentFields = (student) => [student.name, student.email];

const StudentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: students, isFetching, isLoading } = useGetStudentsQuery();
  const [filter, setFilter, filteredStudents] = useFilter(
    students,
    getStudentFields
  );

  const studentsPerPage = 7;
  const totalPages = Math.ceil(students?.length / studentsPerPage);

  const getCurrentPageStudents = () => {
    if (!students) return [];
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  };

  const [addForm, openAddForm, closeAddForm] = useModalFormState();

  return (
    <PageContainer title={"Students"}>
      {(isFetching || isLoading) && <Loader />}
      <div className="m-4">
        <FilterInput value={filter} setValue={setFilter} />
      </div>
      <div className="m-4">
        {filteredStudents.length > 0 && (
          <TableStyled hover>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {students &&
                getCurrentPageStudents().map((user) => (
                  <UserTableRow key={user.id} user={user} />
                ))}
            </tbody>
          </TableStyled>
        )}
        {filteredStudents.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "15px" }}>
            No students
          </h5>
        )}
        <div className="d-flex justify-content-between mb-4">
          <button onClick={openAddForm} className="action-btn">
            Add
          </button>
          {filteredStudents.length > studentsPerPage && (
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
          title="Add new student"
          useAddMutation={useAddStudentMutation}
          useUpdateMutation={useUpdateStudentMutation}
          handleClose={closeAddForm}
        />
      )}
    </PageContainer>
  );
};

export default StudentsPage;
