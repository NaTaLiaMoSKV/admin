import { Modal, ModalFooter } from "react-bootstrap";
import { ModalStyled } from "styles/Modal.styled";
import MessageRating from "./ReviewRating";
import { useDisplayReviewMutation } from "../../../redux/userApi";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";

const ReviewModal = ({ review, handleClose }) => {
  const [updateMessage] = useDisplayReviewMutation();

  const handleDisplayReviewClick = async () => {
    try {
      await updateMessage({ id: review.id }).unwrap();
      toast.success("Review was added to homepage succefully!");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <ModalStyled show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-2 mb-3 align-items-center">
          <img
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            alt="user"
            src={
              review.user.image
                ? `${process.env.REACT_APP_BASE_URL}/images/${review.user.image}`
                : "/user.png"
            }
          ></img>
          <div>
            <p style={{ fontWeight: "bold" }}>{review.user.name}</p>
            {review.rating && <MessageRating count={review.rating} />}
          </div>
        </div>
        <p style={{ maxHeight: "200px", overflowY: "auto" }}>{review.text}</p>
        {review.display && (
          <p className="status-info">Displayed on users` homepages</p>
        )}
      </Modal.Body>
      <ModalFooter>
        {!review.display && (
          <button
            type="button"
            onClick={handleDisplayReviewClick}
            className="action-btn"
            style={{ padding: "10px 20px" }}
          >
            Display on users' homepages
          </button>
        )}
        <a
          href={`mailto:${review.user.email}`}
          className="action-btn"
          style={{ textDecoration: "none" }}
        >
          Reply by mail
        </a>
      </ModalFooter>
    </ModalStyled>
  );
};

export default ReviewModal;
