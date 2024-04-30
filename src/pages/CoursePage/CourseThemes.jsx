import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseThemesQuery } from "../../redux/courseApi";
import { PiWarningLight } from "react-icons/pi";
import EditThemeModalForm from "pages/ThemePage/EditThemeModalForm";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";
import { useModalFormState } from "hooks/useModalFormState";

const ThemesTableRow = ({ theme, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`../themes/${theme.id}`);
  };

  const warning = !theme.content || !theme.homework;

  return (
    <tr onClick={handleClick}>
      <td>{number}.</td>
      <td>{theme.title}</td>
      <td
        style={{
          maxWidth: "200px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {theme.description}
      </td>
      <td>{warning && <PiWarningLight />}</td>
    </tr>
  );
};

const CourseThemes = () => {
  const { id: courseId } = useParams();
  const {
    data: themes,
    isFetching,
    isLoading,
  } = useGetCourseThemesQuery(courseId);
  const [addForm, openAddForm, closeAddForm] = useModalFormState();

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <h2 className="text-center mb-2">Themes</h2>
      <TableStyled hover className="table-fixed">
        <thead>
          <tr>
            <th style={{ width: "48px" }}>#</th>
            <th>Title</th>
            <th>Description</th>
            <th style={{ width: "48px" }}></th>
          </tr>
        </thead>
        <tbody>
          {themes &&
            themes.map((theme, index) => (
              <ThemesTableRow key={theme.id} theme={theme} number={index + 1} />
            ))}
        </tbody>
      </TableStyled>
      <button className="action-btn" onClick={openAddForm}>
        Add
      </button>
      {addForm && (
        <EditThemeModalForm courseId={courseId} handleClose={closeAddForm} />
      )}
    </>
  );
};

export default CourseThemes;
