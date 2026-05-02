import CalorieRecord from './CalorieRecord';
import styles from './RecordList.module.css';

function RecordList(props) {
  return (
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
  );
}

export default RecordList;
