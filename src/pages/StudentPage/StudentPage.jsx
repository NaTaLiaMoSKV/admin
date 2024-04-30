import PageContainer from "components/PageContainer";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserModalForm from "components/UserModalForm";
import {
  useAddStudentMutation,
  useCreateStudentRegistrationTokenMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "../../redux/studentApi";
import { useModalFormState } from "hooks/useModalFormState";
import UserRegistrationModalForm from "components/UserRegistrationModalForm";
import Loader from "components/Loader";
import { CardStyled } from "styles/Card.styled";

const StudentCard = ({ student }) => {
  const [editForm, openEditForm, closeEditForm] = useModalFormState(false);
  const [regForm, openRegForm, closeRegForm] = useModalFormState(false);

  return (
    <>
      <CardStyled>
        <Card.Body className="text-center">
          <Row className="no-gutters">
            <Col
              className="d-flex justify-content-center align-items-center"
              md={4}
            >
              <Card.Img
                src={
                  student.image
                    ? `${process.env.REACT_APP_BASE_URL}/images/${student.image}`
                    : "/user.png"
                }
                alt="User image"
                variant="top"
                style={{ height: "128px", width: "128px" }}
              />
            </Col>
            <Col
              md={8}
              className="d-flex justify-content-center align-items-center"
            >
              <div>
                <Card.Title>{student.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {student.email}
                </Card.Subtitle>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end gap-3">
          <button className="action-btn" onClick={openEditForm}>
            Edit
          </button>
          <button className="action-btn" onClick={openRegForm}>
            Reg token
          </button>
        </Card.Footer>
      </CardStyled>
      {editForm && (
        <UserModalForm
          title="Edit student"
          user={student}
          useAddMutation={useAddStudentMutation}
          useUpdateMutation={useUpdateStudentMutation}
          handleClose={closeEditForm}
        />
      )}
      {regForm && (
        <UserRegistrationModalForm
          user={student}
          useCreateTokenMutation={useCreateStudentRegistrationTokenMutation}
          handleClose={closeRegForm}
        />
      )}
    </>
  );
};

const StudentPage = () => {
  const params = useParams();
  const {
    data: student,
    isFetching,
    isLoading,
  } = useGetStudentQuery(params.id);

  return (
    <PageContainer
      title={"Student"}
      breadcrumbs={[
        { title: "Students", to: "/students" },
        { title: `${student?.name}`, active: true },
      ]}
    >
      {(isFetching || isLoading) && <Loader />}
      {student && (
        <div className="mt-4 mb-4">
          <StudentCard student={student} />
        </div>
      )}
    </PageContainer>
  );
};

export default StudentPage;
