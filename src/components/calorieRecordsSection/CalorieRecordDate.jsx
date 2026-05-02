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
  'oct',
  'Nov',
  'Dec',
];

function CalorieRecordDate(props) {
  const month = MONTHS[props.date.getUTCMonth()];
  const day = props.date.getUTCDate();
  const year = props.date.getUTCFullYear();

  return (
    <StyledRecordCell>
      <div className={styles['record-date-month']}>{month}</div>
      <div className={styles['record-date-day']}>{day}</div>
      <div className={styles['record-date-year']}>{year}</div>
    </StyledRecordCell>
  );
}

export default CalorieRecordDate;
