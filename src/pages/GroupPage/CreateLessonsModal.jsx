import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useGetCourseThemesQuery } from "../../redux/courseApi";
import {
  encodeDateTime,
  equalsDatesAndHours,
  gateDateString,
  gateDateTimeString,
} from "utils/dateUtils";
import { useCreateGroupLessonsMutation } from "../../redux/groupApi";
import { handleError } from "utils/handleError";
import { toast } from "react-toastify";
import { useGetTeacherBusyDatesQuery } from "../../redux/teacherApi";
import NameValueRow from "components/NameValueRow";
import Loader from "components/Loader";
import { ModalStyled } from "styles/Modal.styled";
import { TableStyled } from "styles/Table.styled";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfWeek = (day) => DAYS[day];

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const initialValues = [
  { day: 1, from: 9, to: 18, checked: false },
  { day: 2, from: 9, to: 18, checked: false },
  { day: 3, from: 9, to: 18, checked: false },
  { day: 4, from: 9, to: 18, checked: false },
  { day: 5, from: 9, to: 18, checked: false },
  { day: 6, from: 9, to: 18, checked: false },
  { day: 0, from: 9, to: 18, checked: false },
];

const TimeSelector = ({ value, handleChange, minValue = 9 }) => (
  <select
    style={{ width: "100%" }}
    onChange={handleChange}
    defaultValue={value >= minValue ? value : minValue}
  >
    {HOURS.filter((h) => h >= minValue).map((h) => (
      <option key={h} value={h}>
        {h}
      </option>
    ))}
  </select>
);

const DaySelector = ({ item, handleChange, errorMessage }) => (
  <tr>
    <td style={{ paddingTop: "15px" }}>
      <Form.Check
        type="checkbox"
        id={item.day}
        label={dayOfWeek(item.day)}
        onClick={(e) => handleChange({ checked: e.currentTarget.checked })}
      ></Form.Check>
    </td>
    <td>
      <TimeSelector
        value={item.from}
        handleChange={(e) => {
          const value = Number(e.currentTarget.value);
          handleChange({ from: value, to: item.to < value ? value : item.to });
        }}
      />
    </td>
    <td>
      <TimeSelector
        value={item.to}
        handleChange={(e) =>
          handleChange({ to: Number(e.currentTarget.value) })
        }
        minValue={item.from}
      />
    </td>
    <td>
      {errorMessage && <span className="text-danger">{errorMessage}</span>}
    </td>
  </tr>
);

const calcLessonDates = (lessonsCount, items, startsAfter, busyDates) => {
  let currentDate = new Date(startsAfter);
  const dates = [];
  if (items.every((it) => !it.checked)) {
    for (let i = 0; i < lessonsCount; i++) {
      dates.push(null);
    }
    return dates;
  }
  while (dates.length < lessonsCount) {
    const dayOfWeek = currentDate.getDay();
    const item = items.find((it) => it.day === dayOfWeek);
    if (item.checked) {
      let lessonDate = null;
      for (let h = item.from; h <= item.to; h++) {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          h
        );
        if (!busyDates.find((bd) => equalsDatesAndHours(bd, date))) {
          lessonDate = date;
          break;
        }
      }
      if (!lessonDate) {
        throw currentDate;
      }
      dates.push(lessonDate);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const CreateLessonsModal = ({ group, handleClose }) => {
  const {
    data: themes,
    isThemesFetching,
    isThemesLoading,
  } = useGetCourseThemesQuery(group.course.id);
  const [createGroupLessons] = useCreateGroupLessonsMutation();
  const {
    data: teacherBusyDates,
    isFetching,
    isLoading,
  } = useGetTeacherBusyDatesQuery(group.course.teacher.id);

  const [items, setItems] = useState(initialValues);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setLessons(themes ? themes.map(({ id, title }) => ({ id, title })) : []);
  }, [themes]);

  const isReadyToSubmit = lessons?.length && lessons.every(({ date }) => date);

  const handleSubmit = async () => {
    if (!isReadyToSubmit) {
      console.log("Not ready");
      return;
    }
    try {
      const data = lessons.map(({ id, date }) => ({
        theme: id,
        startsAt: encodeDateTime(date),
      }));
      await createGroupLessons({
        id: group.id,
        data,
      });
      toast.success("Lessons created successfully!");
      handleClose();
    } catch (err) {
      handleError(err);
    }
  };

  const handleChange = (day, values) => {
    const newItems = items.map((item) => {
      if (item.day === day) {
        return { ...item, ...values };
      } else {
        return item;
      }
    });
    setItems(newItems);

    try {
      const dates = calcLessonDates(
        lessons.length,
        newItems,
        group.startsAfter,
        teacherBusyDates
      );
      setLessons(
        lessons.map((lesson, index) => ({ ...lesson, date: dates[index] }))
      );
      setError();
    } catch (err) {
      setLessons(lessons.map((lesson, index) => ({ ...lesson, date: null })));
      console.error("Error:", err);
      if (err instanceof Date) {
        setError({
          day: err.getDay(),
          message: `No time for lesson by date ${gateDateString()}`,
        });
      }
    }
  };

  return (
    <ModalStyled show={true} onHide={handleClose}>
      {(isFetching || isLoading || isThemesFetching || isThemesLoading) && (
        <Loader />
      )}
      <Modal.Header closeButton>
        <Modal.Title>Create lessons for group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="fw-bold text-center mb-2">Select days and time</p>
          <TableStyled>
            <thead>
              <tr>
                <th style={{ width: "150px" }}>Day</th>
                <th style={{ width: "150px" }}>From</th>
                <th style={{ width: "150px" }}>To</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <DaySelector
                  key={it.day}
                  item={it}
                  handleChange={(values) => handleChange(it.day, values)}
                  errorMessage={
                    error && error.day === it.day ? error.message : null
                  }
                />
              ))}
            </tbody>
          </TableStyled>
        </div>
        <hr />
        <div>
          <NameValueRow
            name="Starts"
            value={gateDateString(group.startsAfter)}
          />
        </div>
        <hr />
        <TableStyled striped>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>#</th>
              <th>Theme</th>
              <th style={{ width: "200px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((it, i) => (
              <tr key={it.id}>
                <td>{i + 1}</td>
                <td>{it.title}</td>
                <td>{gateDateTimeString(it.date)}</td>
              </tr>
            ))}
          </tbody>
        </TableStyled>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="action-btn"
          onClick={handleSubmit}
          disabled={!isReadyToSubmit}
        >
          Create
        </button>
      </Modal.Footer>
    </ModalStyled>
  );
};

export default CreateLessonsModal;
