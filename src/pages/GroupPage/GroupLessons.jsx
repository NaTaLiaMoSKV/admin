import { useGetGroupLessonsQuery } from "../../redux/groupApi";
import { gateDateTimeString } from "utils/dateUtils";
import CreateLessonsModal from "./CreateLessonsModal";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";
import { useModalFormState } from "hooks/useModalFormState";

const GroupLessonTableRow = ({ lesson, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`../lessons/${lesson.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="text-center"
      style={{ cursor: "pointer" }}
    >
      <td>{number}</td>
      <td>{lesson.theme.title} </td>
      <td>{gateDateTimeString(lesson.startsAt)}</td>
    </tr>
  );
};

const GroupLessons = ({ group }) => {
  const {
    data: lessons,
    isFetching,
    isLoading,
  } = useGetGroupLessonsQuery(group.id);

  const [addForm, openAddForm, closeAddForm] = useModalFormState();
  const isLessonsCreated = Boolean(lessons && lessons.length);

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <h2 className="text-center mb-2">Lessons</h2>
      {isLessonsCreated ? (
        <TableStyled hover>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>#</th>
              <th>Theme</th>
              <th style={{ width: "200px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <GroupLessonTableRow
                key={lesson.id}
                lesson={lesson}
                number={index + 1}
              />
            ))}
          </tbody>
        </TableStyled>
      ) : (
        <h5 style={{ textAlign: "center", marginTop: "15px" }}>No data</h5>
      )}
      <button
        className="action-btn mb-4"
        onClick={openAddForm}
        disabled={isLessonsCreated}
      >
        Add
      </button>
      {addForm && (
        <CreateLessonsModal group={group} handleClose={closeAddForm} />
      )}
    </>
  );
};

export default GroupLessons;
