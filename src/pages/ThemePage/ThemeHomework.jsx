import { useGetThemeHomeworkQuery } from "../../redux/courseApi";
import { Card } from "react-bootstrap";
import EditThemeHomeworkModalForm from "./EditThemeHomeworkModalForm";
import Loader from "components/Loader";
import { CardStyled } from "styles/Card.styled";
import { useModalFormState } from "hooks/useModalFormState";

const ThemeHomework = ({ themeId }) => {
  const {
    data: homework,
    isFetching,
    isLoading,
  } = useGetThemeHomeworkQuery(themeId);
  const [editForm, openEditForm, closeEditForm] = useModalFormState();

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <CardStyled>
        <Card.Header>Homework</Card.Header>
        <Card.Body style={{ maxHeight: "200px", overflowY: "auto" }}>
          {homework?.data ? (
            <div dangerouslySetInnerHTML={{ __html: homework?.data }} />
          ) : (
            <Card.Text>No data</Card.Text>
          )}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end gap-3">
          <button className="action-btn" onClick={openEditForm}>
            Edit
          </button>
        </Card.Footer>
      </CardStyled>
      {editForm && (
        <EditThemeHomeworkModalForm
          themeId={themeId}
          initialValues={homework}
          handleClose={closeEditForm}
        />
      )}
    </>
  );
};

export default ThemeHomework;
