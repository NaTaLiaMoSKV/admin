import { Modal } from "react-bootstrap";
import { useSetThemeHomeworkMutation } from "../../redux/courseApi";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { EditorModalStyled } from "styles/Modal.styled";
import Editor from "components/Editor/Editor";

const initialValuesDef = {
  data: "",
};

const EditThemeHomeworkModalForm = ({
  themeId,
  initialValues,
  handleClose,
}) => {
  const [setThemeHomework] = useSetThemeHomeworkMutation();

  const isQuillEmpty = (value) => {
    return (
      value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
      !value.includes("<img")
    );
  };

  const handleSubmit = async (homework) => {
    if (isQuillEmpty(homework)) {
      toast.warning("Theme homework can not be empty string!");
      return;
    }
    try {
      await setThemeHomework({ data: homework, id: themeId }).unwrap();
      toast.success("Theme homework was updated succefully!");
      handleClose();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <EditorModalStyled show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set homework</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Editor
          initialValue={initialValues ?? initialValuesDef}
          handleSave={handleSubmit}
        />
      </Modal.Body>
    </EditorModalStyled>
  );
};

export default EditThemeHomeworkModalForm;
