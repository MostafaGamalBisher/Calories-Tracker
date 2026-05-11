import StyledRecordCell from '../common/StyledRecordCell';
import styles from './CalorieRecordDate.module.css';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function CalorieRecordDate(props) {
  // Switched to Local Time methods!
  const month = MONTHS[props.date.getMonth()];
  const day = props.date.getDate();
  const year = props.date.getFullYear();

  return (
    <StyledRecordCell>
      <div className={styles['record-date-month']}>{month}</div>
      <div className={styles['record-date-day']}>{day}</div>
      <div className={styles['record-date-year']}>{year}</div>
    </StyledRecordCell>
  );
}

export default CalorieRecordDate;
