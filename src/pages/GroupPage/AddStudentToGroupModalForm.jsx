import { Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { useUpdateGroupMutation } from "../../redux/groupApi";
import { useGetStudentsQuery } from "../../redux/studentApi";
import Loader from "components/Loader";
import { ModalStyled } from "styles/Modal.styled";
import { FormSelectStyled } from "styles/Form.styled";

const validationSchema = yup.object({
  student: yup.string().required(),
});

const initialValues = {
  student: "",
};

const AddStudentToGroupModalForm = ({ group, handleClose }) => {
  const [update] = useUpdateGroupMutation();

  const { data: allStudents, isFetching, isLoading } = useGetStudentsQuery();

  const students = allStudents
    ? allStudents.filter(({ id }) => !group.students.find((gs) => gs.id === id))
    : [];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const data = {
            id: group.id,
            students: [...group.students.map(({ id }) => id), values.student],
          };
          await update(data).unwrap();
          toast.success("Student was added to group succefully!");
          handleClose();
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <>
          {(isFetching || isLoading) && <Loader />}
          <ModalStyled show={true} onHide={handleClose}>
            <Form onSubmit={handleSubmit} noValidate>
              <Modal.Header closeButton>
                <Modal.Title>Add student</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <FormSelectStyled
                    aria-label="Select student"
                    name="student"
                    value={values.student}
                    onChange={handleChange}
                    isInvalid={touched.student && errors.student}
                  >
                    <option value="">-</option>
                    {students &&
                      students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                  </FormSelectStyled>
                  <Form.Control.Feedback type="invalid">
                    {errors.student}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleClose} className="action-btn">
                  Close
                </button>
                <button type="submit" className="action-btn">
                  Send
                </button>
              </Modal.Footer>
            </Form>
          </ModalStyled>
        </>
      )}
    </Formik>
  );
};

export default AddStudentToGroupModalForm;
