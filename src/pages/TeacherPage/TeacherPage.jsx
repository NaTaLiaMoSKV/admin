import PageContainer from "components/PageContainer";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useCreateTeacherRegistrationTokenMutation,
  useGetTeacherQuery,
} from "../../redux/teacherApi";
import {
  useAddTeacherMutation,
  useUpdateTeacherMutation,
} from "../../redux/teacherApi";
import UserModalForm from "components/UserModalForm";
import { useModalFormState } from "hooks/useModalFormState";
import UserRegistrationModalForm from "components/UserRegistrationModalForm";
import Loader from "components/Loader";
import { CardStyled } from "styles/Card.styled";

const TeacherCard = ({ teacher }) => {
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
                  teacher.image
                    ? `${process.env.REACT_APP_BASE_URL}/images/${teacher.image}`
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
                <Card.Title>{teacher.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {teacher.email}
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
          title="Edit teacher"
          user={teacher}
          useAddMutation={useAddTeacherMutation}
          useUpdateMutation={useUpdateTeacherMutation}
          handleClose={closeEditForm}
        />
      )}
      {regForm && (
        <UserRegistrationModalForm
          user={teacher}
          useCreateTokenMutation={useCreateTeacherRegistrationTokenMutation}
          handleClose={closeRegForm}
        />
      )}
    </>
  );
};

const TeacherPage = () => {
  const params = useParams();
  const {
    data: teacher,
    isFetching,
    isLoading,
  } = useGetTeacherQuery(params.id);

  return (
    <PageContainer
      title={"Teacher"}
      breadcrumbs={[
        { title: "Teachers", to: "/teachers" },
        { title: `${teacher?.name}`, active: true },
      ]}
    >
      {(isFetching || isLoading) && <Loader />}
      {teacher && (
        <div className="mt-4 mb-4">
          <TeacherCard teacher={teacher} />
        </div>
      )}
    </PageContainer>
  );
};

export default TeacherPage;
