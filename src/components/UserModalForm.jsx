import { Modal, Form, FormControl } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { ModalStyled } from "styles/Modal.styled";

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

const initialValues = {
  name: "",
  email: "",
};

const UserModalForm = ({
  user,
  title,
  handleClose,
  useUpdateMutation,
  useAddMutation,
}) => {
  const [update] = useUpdateMutation();
  const [add] = useAddMutation();

  const isEditMode = Boolean(user);

  return (
    <Formik
      initialValues={user ?? initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          if (isEditMode) {
            await update(values).unwrap();
            toast.success("User was updated succefully!");
          } else {
            await add(values).unwrap();
            toast.success("User was added succefully!");
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
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <FormControl
                  className="formControl"
                  type="text"
                  name="name"
                  placeholder="Name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <FormControl
                  className="formControl"
                  placeholder="Email"
                  type="text"
                  name="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                  disabled={isEditMode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
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

export default UserModalForm;
