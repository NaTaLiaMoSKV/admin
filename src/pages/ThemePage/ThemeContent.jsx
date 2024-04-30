import { useGetThemeContentQuery } from "../../redux/courseApi";
import { Card } from "react-bootstrap";
import EditThemeContentModalForm from "./EditThemeContentModalForm";
import Loader from "components/Loader";
import { CardStyled } from "styles/Card.styled";
import { useModalFormState } from "hooks/useModalFormState";

const ThemeContent = ({ themeId }) => {
  const {
    data: content,
    isFetching,
    isLoading,
  } = useGetThemeContentQuery(themeId);
  const [editForm, openEditForm, closeEditForm] = useModalFormState();

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <CardStyled>
        <Card.Header>Content</Card.Header>
        <Card.Body style={{ maxHeight: "200px", overflowY: "auto" }}>
          {content?.data ? (
            <div dangerouslySetInnerHTML={{ __html: content?.data }} />
          ) : (
            <Card.Text>No data</Card.Text>
          )}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end gap-3">
          <button className="action-btn" onClick={openEditForm}>
            Edit
          </button>
        </Card.Footer>
      </CardStyled>
      {editForm && (
        <EditThemeContentModalForm
          themeId={themeId}
          initialValues={content}
          handleClose={closeEditForm}
        />
      )}
    </>
  );
};

export default ThemeContent;
