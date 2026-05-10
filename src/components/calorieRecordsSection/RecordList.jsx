import { useContext } from 'react';
import { CaloriesContext } from '../../CaloriesContext';
import CalorieRecord from './CalorieRecord';
import styles from './RecordList.module.css';
import { Link } from 'react-router-dom';

function RecordList() {
  const { dailyRecords, totalCalories } = useContext(CaloriesContext);

  if (dailyRecords.length === 0) {
    return (
      <div className={styles['empty-state']}>
        No meals recorded for this date.
      </div>
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {dailyRecords.map((record) => (
          <li key={record.id} className={styles.listItem}>
            <Link to={`/track/${record.id}`}>
              <CalorieRecord {...record}></CalorieRecord>
            </Link>
          </li>
        ))}
      </ul>
      <p>Total Calories: {totalCalories}</p>
    </>
  );
}

export default RecordList;
