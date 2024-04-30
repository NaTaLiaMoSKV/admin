import { Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import {
  useAddCourseThemeMutation,
  useUpdateThemeMutation,
} from "../../redux/courseApi";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { ModalStyled } from "styles/Modal.styled";

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

const initialValuesDef = {
  title: "",
  description: "",
};

const EditThemeModalForm = ({ initialValues, courseId, handleClose }) => {
  const [updateTheme] = useUpdateThemeMutation();
  const [addCourseTheme] = useAddCourseThemeMutation();

  return (
    <Formik
      initialValues={initialValues ?? initialValuesDef}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          if (initialValues) {
            await updateTheme(values).unwrap();
            toast.success("Theme was updated succefully!");
          } else {
            await addCourseTheme({ courseId, ...values }).unwrap();
            toast.success("Theme was added succefully!");
          }
          handleClose();
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <ModalStyled show={true} onHide={handleClose}>
          <Form onSubmit={handleSubmit} noValidate>
            <Modal.Header closeButton>
              <Modal.Title>
                {initialValues ? "Edit theme" : "Add new theme"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Control
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
              <Form.Group>
                <Form.Control
                  className="formControl"
                  type="text"
                  placeholder="Description"
                  name="description"
                  autoComplete="off"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose} className="action-btn">
                Cancel
              </button>
              <button type="submit" className="action-btn">
                Send
              </button>
            </Modal.Footer>
          </Form>
        </ModalStyled>
      )}
    </Formik>
  );
};

export default EditThemeModalForm;
