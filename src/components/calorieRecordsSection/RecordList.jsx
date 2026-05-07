import CalorieRecord from './CalorieRecord';
import styles from './RecordList.module.css';

function RecordList(props) {
  if (props.records.length === 0) {
    return (
      <div className={styles['empty-state']}>
        No meals recorded for this date.
      </div>
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {props.records.map((record) => (
          <li key={record.id} className={styles.listItem}>
            <CalorieRecord
              date={record.date}
              meal={record.meal}
              content={record.content}
              calories={record.calories}
            ></CalorieRecord>
          </li>
        ))}
      </ul>
      <p>Total Calories: {props.totalCalories}</p>
    </>
  );
}

export default RecordList;
