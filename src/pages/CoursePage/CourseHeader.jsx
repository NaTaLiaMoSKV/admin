import { useNavigate } from "react-router-dom";
import { useDeleteCourseMutation } from "../../redux/courseApi";
import { Card } from "react-bootstrap";
import EditCourseModalForm from "./EditCourseModalForm";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { CardStyled } from "styles/Card.styled";
import { useModalFormState } from "hooks/useModalFormState";

const CourseHeader = ({ course, setSkip }) => {
  const navigate = useNavigate();
  const [deleteCourse] = useDeleteCourseMutation();
  const [editForm, openEditForm, closeEditForm] = useModalFormState();

  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete course " + course.id + "?")) {
      return;
    }
    try {
      setSkip(true);
      await deleteCourse(course.id).unwrap();
      toast.success("Course deleted");
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
          {course && (
            <>
              <Card.Title style={{ marginBottom: "15px" }}>
                {course.title}
              </Card.Title>
              <Card.Text className="mb-2 text-muted">
                {course.description}
              </Card.Text>
              <Card.Text>{course.teacher.name}</Card.Text>
            </>
          )}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end gap-3">
          <button className="action-btn" onClick={openEditForm}>
            Edit
          </button>
          <button
            className="action-btn"
            onClick={handleDelete}
            disabled={!course?.canDelete}
          >
            Delete
          </button>
        </Card.Footer>
      </CardStyled>
      {editForm && (
        <EditCourseModalForm
          initialValues={{ ...course, teacher: course.teacher.id }}
          handleClose={closeEditForm}
        />
      )}
    </>
  );
};

export default CourseHeader;
