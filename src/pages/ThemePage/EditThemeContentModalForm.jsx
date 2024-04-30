import { Modal } from "react-bootstrap";
import { useSetThemeContentMutation } from "../../redux/courseApi";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { EditorModalStyled } from "styles/Modal.styled";
import Editor from "components/Editor/Editor";

const initialValuesDef = {
  data: "",
};

const EditThemeContentModalForm = ({ themeId, initialValues, handleClose }) => {
  const [setThemeContent] = useSetThemeContentMutation();

  const isQuillEmpty = (value) => {
    return (
      value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
      !value.includes("<img")
    );
  };

  const handleSubmit = async (content) => {
    if (isQuillEmpty(content)) {
      toast.warning("Theme content can not be empty string!");
      return;
    }
    try {
      await setThemeContent({ data: content, id: themeId }).unwrap();
      toast.success("Theme content was updated succefully!");
      handleClose();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <EditorModalStyled show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set content</Modal.Title>
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

export default EditThemeContentModalForm;
