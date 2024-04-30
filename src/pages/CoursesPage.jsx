import { useNavigate } from "react-router-dom";
import { useGetCoursesQuery } from "../redux/courseApi";
import EditCourseModalForm from "./CoursePage/EditCourseModalForm";
import PageContainer from "components/PageContainer";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";
import { useModalFormState } from "hooks/useModalFormState";
import useFilter from "hooks/useFilter";
import FilterInput from "components/FilterInput";

const CoursesTableRow = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${course.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="text-center"
      style={{ cursor: "pointer" }}
    >
      <td>{course.title}</td>
      <td
        style={{
          maxWidth: "200px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {course.description}
      </td>
      <td>{course.teacher.name}</td>
    </tr>
  );
};

const getCourseFields = (course) => [
  course.title,
  course.description,
  course.teacher.name,
];

const CoursesPage = () => {
  const { data: courses, isFetching, isLoading } = useGetCoursesQuery();
  const [filter, setFilter, filteredCourses] = useFilter(
    courses,
    getCourseFields
  );

  const [addForm, openAddForm, closeAddForm] = useModalFormState();

  return (
    <PageContainer>
      {(isFetching || isLoading) && <Loader />}
      <div className="m-4">
        <FilterInput value={filter} setValue={setFilter} />
      </div>
      <div className="m-4">
        {filteredCourses.length > 0 && (
          <TableStyled hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                filteredCourses.map((course) => (
                  <CoursesTableRow key={course.id} course={course} />
                ))}
            </tbody>
          </TableStyled>
        )}
        {filteredCourses.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "15px" }}>No courses</h5>
        )}
        <button onClick={openAddForm} className="action-btn">
          Add
        </button>
      </div>
      {addForm && <EditCourseModalForm handleClose={closeAddForm} />}
    </PageContainer>
  );
};

export default CoursesPage;
