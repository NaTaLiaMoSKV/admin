import { Card } from "react-bootstrap";
import { gateDateString, gateTimeString } from "utils/dateUtils";
import NameValueRow from "components/NameValueRow";
import { CardStyled } from "styles/Card.styled";

const LessonHeader = ({ lesson }) => {
  const { group, theme } = lesson;

  return (
    <CardStyled>
      <Card.Body>
        <NameValueRow name="Group" value={group.name} sm={3} />
        <NameValueRow name="Theme" value={theme.title} sm={3} />
        <NameValueRow
          name="Teacher"
          value={theme.course.teacher.name}
          linkTo={`../../teachers/${theme.course.teacher.id}`}
          sm={3}
        />
        <NameValueRow
          name="Start date"
          value={gateDateString(lesson.startsAt)}
          sm={3}
        />
        {!lesson.startedAt && <p className="status-info">Not started</p>}
        {lesson.startedAt && (
          <p className="status-info">
            {`Started on ${gateDateString(
              lesson.startedAt
            )} at ${gateTimeString(lesson.startedAt)}`}
          </p>
        )}
        {lesson.finishedAt && (
          <p className="status-info mt-1">
            {`Finished on ${gateDateString(
              lesson.finishedAt
            )} at ${gateTimeString(lesson.finishedAt)}`}
          </p>
        )}
      </Card.Body>
    </CardStyled>
  );
};

export default LessonHeader;
