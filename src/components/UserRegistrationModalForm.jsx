import { Modal, Container } from "react-bootstrap";
import { handleError } from "utils/handleError";
import { useState } from "react";
import { ModalStyled } from "styles/Modal.styled";

const UserRegistrationModalForm = ({
  user,
  handleClose,
  useCreateTokenMutation,
}) => {
  const [createToken] = useCreateTokenMutation();
  const [link, setLink] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCreateNewToken = async () => {
    if (!window.confirm("Do you want to create new token?")) {
      return;
    }
    try {
      const result = await createToken(user.id).unwrap();
      setLink(result.link);
    } catch (err) {
      handleError(err);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    setIsCopied(true);
  };

  return (
    <ModalStyled show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create registration token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>Link:</p>
          <p style={{ wordBreak: "break-all", maxWidth: "400px" }}>
            {link ? link : "-"}
          </p>
          <p className={isCopied ? "copied-text" : "copied-text hidden"}>
            copied
          </p>
          <div className="d-flex justify-content-end">
            <button
              className="action-btn"
              onClick={handleCopy}
              disabled={!link}
            >
              Copy
            </button>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <button className="action-btn" onClick={handleClose}>
          Close
        </button>
        <button className="action-btn" onClick={handleCreateNewToken}>
          Create new
        </button>
      </Modal.Footer>
    </ModalStyled>
  );
};

export default UserRegistrationModalForm;
