import { useContext } from 'react';
import { CaloriesContext } from '../../CaloriesContext';
import CalorieRecord from './CalorieRecord';
import styles from './RecordList.module.css';
import { Link } from 'react-router-dom';

function RecordList() {
  const { dailyRecords, totalCalories } = useContext(CaloriesContext);

  return (
    <>
      <ul className={styles.list}>
        {dailyRecords.map((record) => (
          <li key={record.id} className={styles.listItem}>
            <Link to={`${record.id}`}>
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
