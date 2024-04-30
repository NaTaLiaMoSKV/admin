import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import AddStudentToGroupModalForm from "./AddStudentToGroupModalForm";
import { MdDeleteForever } from "react-icons/md";
import { useUpdateGroupMutation } from "../../redux/groupApi";
import { TableStyled } from "styles/Table.styled";
import { IconButton } from "styles/IconButton.styled";
import { useModalFormState } from "hooks/useModalFormState";

const GroupStudentTableRow = ({ student, number, handleRemoveStudent }) => {
  return (
    <tr className="text-center" style={{ cursor: "pointer" }}>
      <td>{number}</td>
      <td>
        <Link to={`../students/${student.id}`}>{student.name}</Link>
      </td>
      <td className="d-flex justify-content-end align-items-center">
        <IconButton
          onClick={async () => {
            await handleRemoveStudent(student);
          }}
        >
          <MdDeleteForever />
        </IconButton>
      </td>
    </tr>
  );
};

const GroupStudents = ({ group }) => {
  const [addForm, openAddForm, closeAddForm] = useModalFormState();

  const [updateGroup] = useUpdateGroupMutation();

  const handleRemoveStudent = async (student) => {
    if (
      !window.confirm(
        "Do you want to delete student " +
          student.name +
          " from group " +
          group.name +
          "?"
      )
    ) {
      return;
    }
    try {
      const update = {
        id: group.id,
        students: group.students
          .filter(({ id }) => id !== student.id)
          .map(({ id }) => id),
      };

      await updateGroup(update).unwrap();
      toast.success("Student was removed from group succefully!");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <h2 className="text-center mb-2">Students</h2>
      {group.students.length > 0 ? (
        <TableStyled>
          <thead>
            <tr>
              <th style={{ width: "120px" }}>#</th>
              <th>Name</th>
              <th style={{ width: "120px" }}></th>
            </tr>
          </thead>
          <tbody>
            {group.students.map((student, index) => (
              <GroupStudentTableRow
                key={student.id}
                student={student}
                number={index + 1}
                handleRemoveStudent={handleRemoveStudent}
              />
            ))}
          </tbody>
        </TableStyled>
      ) : (
        <h5 style={{ textAlign: "center", marginTop: "15px" }}>No data</h5>
      )}
      <button className="action-btn" onClick={openAddForm}>
        Add
      </button>
      {addForm && (
        <AddStudentToGroupModalForm group={group} handleClose={closeAddForm} />
      )}
    </>
  );
};

export default GroupStudents;
