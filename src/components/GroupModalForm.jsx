import { Modal, Form } from "react-bootstrap";
import { Formik, useField } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import {
  useAddGroupMutation,
  useUpdateGroupMutation,
  useGetGroupLessonsQuery,
} from "../redux/groupApi";
import { useGetCoursesQuery } from "../redux/courseApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gateDateString } from "utils/dateUtils";
import { ModalStyled } from "styles/Modal.styled";
import Loader from "./Loader";

const validationSchema = yup.object({
  name: yup.string().required(),
  course: yup.string().required(),
  startsAfter: yup.date().required(),
});

const initialValues = {
  name: "",
  course: "",
  startsAfter: "",
};

const MyDatePicker = ({ name = "" }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      {...field}
      selected={value}
      onChange={(date) => setValue(date)}
    />
  );
};

const GroupModalForm = ({ group, handleClose }) => {
  const {
    data: lessons,
    isLoading,
    isFetching,
  } = useGetGroupLessonsQuery(group?.id, {
    skip: !group,
  });
  const [add] = useAddGroupMutation();
  const [update] = useUpdateGroupMutation();

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isFetching: isCoursesFetching,
  } = useGetCoursesQuery();

  const isEditMode = Boolean(group);

  return (
    <Formik
      initialValues={group ?? initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          if (isEditMode) {
            const data = {
              id: group.id,
              name: values.name,
              startsAfter: gateDateString(values.startsAfter),
            };
            await update(data).unwrap();
            toast.success("Group was updated succefully!");
          } else {
            const data = {
              ...values,
              startsAfter: gateDateString(values.startsAfter),
            };
            await add(data).unwrap();
            toast.success("Group was added succefully!");
          }
          handleClose();
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <ModalStyled show={true} onHide={handleClose}>
          {(isFetching ||
            isLoading ||
            isCoursesFetching ||
            isCoursesLoading) && <Loader />}
          <Form onSubmit={handleSubmit} noValidate>
            <Modal.Header closeButton>
              <Modal.Title>
                {isEditMode ? "Edit group" : "Add new group"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <select
                  aria-label="Select course"
                  name="course"
                  style={{ width: "100%" }}
                  value={values.course}
                  onChange={handleChange}
                  isInvalid={touched.course && errors.course}
                  disabled={isEditMode}
                >
                  <option value="">-</option>
                  {courses &&
                    courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                </select>
                <Form.Control.Feedback type="invalid">
                  {errors.course}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                {lessons?.length ? (
                  <Form.Label>
                    Start date: {gateDateString(values.startsAfter)}
                  </Form.Label>
                ) : (
                  <div className="d-flex gap-3 align-items-center">
                    <Form.Label className="fs-6 fw-light m-0">
                      Start date
                    </Form.Label>
                    <MyDatePicker
                      name="startsAfter"
                      disabled={lessons?.length}
                    />
                  </div>
                )}
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
      )}
    </Formik>
  );
};

export default GroupModalForm;
