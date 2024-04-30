import { Modal, Form, FormControl } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import {
  useAddCourseMutation,
  useUpdateCourseMutation,
} from "../../redux/courseApi";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { useGetTeachersQuery } from "../../redux/teacherApi";
import Loader from "components/Loader";
import { ModalStyled } from "styles/Modal.styled";
import { FormSelectLabelStyled, FormSelectStyled } from "styles/Form.styled";

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  teacher: yup.string().required(),
});

const initialValuesDef = {
  title: "",
  description: "",
  teacher: "",
};

const EditCourseModalForm = ({ initialValues, handleClose }) => {
  const [updateCourse] = useUpdateCourseMutation();
  const [addCourse] = useAddCourseMutation();
  const { data: teachers, isFetching, isLoading } = useGetTeachersQuery();

  return (
    <Formik
      initialValues={initialValues ?? initialValuesDef}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          if (initialValues) {
            await updateCourse(values).unwrap();
            toast.success("Course was updated succefully!");
          } else {
            await addCourse(values).unwrap();
            toast.success("Course was added succefully!");
          }
          handleClose();
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div>
          {(isFetching || isLoading) && <Loader />}
          <ModalStyled show={true} onHide={handleClose}>
            <Form onSubmit={handleSubmit} noValidate>
              <Modal.Header closeButton>
                <Modal.Title>
                  {initialValues ? "Edit course" : "Add new course"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <FormControl
                    className="formControl"
                    type="text"
                    name="title"
                    placeholder="Title"
                    autoComplete="off"
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={touched.title && errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FormControl
                    className="formControl"
                    type="text"
                    name="description"
                    placeholder="Description"
                    autoComplete="off"
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={touched.description && errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <FormSelectLabelStyled>Teacher</FormSelectLabelStyled>
                  <FormSelectStyled
                    aria-label="Select teacher"
                    name="teacher"
                    value={values.teacher}
                    onChange={handleChange}
                    isInvalid={touched.teacher && errors.teacher}
                  >
                    <option value="">-</option>
                    {teachers &&
                      teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </option>
                      ))}
                  </FormSelectStyled>
                  <Form.Control.Feedback type="invalid">
                    {errors.teacher}
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
        </div>
      )}
    </Formik>
  );
};

export default EditCourseModalForm;
