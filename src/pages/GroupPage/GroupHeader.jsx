import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import GroupModalForm from "components/GroupModalForm";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { gateDateString } from "utils/dateUtils";
import {
  useDeleteGroupMutation,
  useGetGroupLessonsQuery,
} from "../../redux/groupApi";
import { CardStyled } from "styles/Card.styled";
import { useModalFormState } from "hooks/useModalFormState";
import Loader from "components/Loader";

const GroupHeader = ({ group, setSkip }) => {
  const navigate = useNavigate();
  const [deleteGroup] = useDeleteGroupMutation();
  const {
    data: lessons,
    isFetching,
    isLoading,
  } = useGetGroupLessonsQuery(group.id);

  const [editForm, openEditForm, closeEditForm] = useModalFormState();

  const isLessonsCreated = Boolean(lessons && lessons.length);
  const canDelete = !Boolean(group.startedAt);

  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete group " + group.name + "?")) {
      return;
    }
    try {
      setSkip(true);
      await deleteGroup(group.id).unwrap();
      toast.success("Group deleted");
      navigate(-1);
    } catch (err) {
      handleError(err);
      setSkip(false);
    }
  };

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <CardStyled>
        <Card.Body>
          <Card.Title style={{ marginBottom: "15px" }}>{group.name}</Card.Title>
          <Card.Subtitle className="mb-2">{group.course.title}</Card.Subtitle>
          <Card.Subtitle className="m-0 text-muted">
            {group.course.teacher.name}
          </Card.Subtitle>
          <Card.Text>{gateDateString(group.startsAfter)}</Card.Text>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-end gap-3">
          {!isLessonsCreated && (
            <button className="action-btn" onClick={openEditForm}>
              Edit
            </button>
          )}
          <button
            className="action-btn"
            onClick={handleDelete}
            disabled={!canDelete}
          >
            Delete
          </button>
        </Card.Footer>
      </CardStyled>
      {editForm && (
        <GroupModalForm
          group={{ ...group, course: group.course.id }}
          handleClose={closeEditForm}
        />
      )}
    </>
  );
};

export default GroupHeader;
