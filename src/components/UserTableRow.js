import { useNavigate } from "react-router-dom";

const UserTableRow = ({ user, groups }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${user.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="text-center"
      style={{ cursor: "pointer" }}
    >
      <td style={{ width: "50px" }}>
        <img
          style={{ width: "25px", height: "25px", borderRadius: "50%" }}
          alt="user"
          src={
            user.image
              ? `${process.env.REACT_APP_BASE_URL}/images/${user.image}`
              : "/user.png"
          }
        ></img>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {groups && (
        <td style={{ width: "50px" }}>
          {groups.filter((group) => group.course.teacher === user.id).length}
        </td>
      )}
    </tr>
  );
};

export default UserTableRow;
