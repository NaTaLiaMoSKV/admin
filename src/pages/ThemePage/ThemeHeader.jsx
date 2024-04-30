import { useNavigate } from "react-router-dom";
import { useDeleteThemeMutation } from "../../redux/courseApi";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import EditThemeModalForm from "./EditThemeModalForm";
import { CardStyled } from "styles/Card.styled";
import { useModalFormState } from "hooks/useModalFormState";

const ThemeHeader = ({ theme, setSkip }) => {
  const navigate = useNavigate();

  const [deleteTheme] = useDeleteThemeMutation();
  const [editForm, openEditForm, closeEditForm] = useModalFormState();

  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete theme " + theme.title + "?")) {
      return;
    }
    try {
      setSkip(true);
      await deleteTheme(theme.id).unwrap();
      toast.success("Theme deleted");
      navigate(-1);
    } catch (err) {
      handleError(err);
      setSkip(false);
    }
  };

  return (
    <>
      <CardStyled>
        <Card.Body>
          <Card.Title>{theme.title}</Card.Title>
          <Card.Text className="mb-2 text-muted">{theme.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end gap-3">
          <button
            variant="outline-primary"
            className="action-btn"
            onClick={openEditForm}
          >
            Edit
          </button>
          <button className="action-btn" onClick={handleDelete}>
            Delete
          </button>
        </Card.Footer>
      </CardStyled>
      {editForm && (
        <EditThemeModalForm initialValues={theme} handleClose={closeEditForm} />
      )}
    </>
  );
};

export default ThemeHeader;
