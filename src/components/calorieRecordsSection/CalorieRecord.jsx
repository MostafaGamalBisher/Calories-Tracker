import { useState } from 'react';

import CalorieRecordDate from '../CalorieRecordDate';
import StyledRecordCell from '../StyledRecordCell';
import './CalorieRecord.css';

function CalorieRecord(props) {
  const [curentCalories, setCurrentCalories] = useState(Number(props.calories));

  const caloriesHandler = () => {
    // console.log(curentCalories);
    setCurrentCalories(curentCalories + 10);
    // console.log(curentCalories);
  };
  console.log(curentCalories);
  return (
    <ul className="record">
      <li>
        <CalorieRecordDate date={props.date}></CalorieRecordDate>
      </li>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li className="record-calories" onClick={caloriesHandler}>
        <StyledRecordCell>{curentCalories}</StyledRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
