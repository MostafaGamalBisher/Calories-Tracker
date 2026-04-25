import CalorieRecordDate from '../CalorieRecordDate';
import StyledRecordCell from '../StyledRecordCell';
import './CalorieRecord.css';

function CalorieRecord(props) {
  return (
    <ul className="record">
      <li>
        <CalorieRecordDate date={props.date}></CalorieRecordDate>
      </li>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li className="record-calories">
        <StyledRecordCell>{props.calories}</StyledRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
