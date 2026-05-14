import styles from './TrackPage.module.css';
import { Link } from 'react-router-dom';
import RecordList from '../components/calorieRecordsSection/RecordList';
import { useContext } from 'react';
import { CaloriesContext } from '../CaloriesContext';
import { TextContent } from '../components/common/TextContent';

export function TrackPage() {
  const { setCurrentDate, currentDateStr, records, errorMsg, status } =
    useContext(CaloriesContext);

  const dateChangeHandler = (e) => {
    setCurrentDate(new Date(e.target.value));
  };

  let content;

  switch (status) {
    case 'loading':
      content = <TextContent value="Loading your meals..." />;
      break;
    case 'error':
      content = <TextContent value={`Error: ${errorMsg}`} />;
      break;
    case 'success':
      if (records.length === 0) {
        content = <TextContent value="No records found for this day" />;
      } else {
        content = <RecordList />;
      }
      break;
    default:
      content = null;
  }

  return (
    <div className="App">
      <h1 className={styles.title}>Calories Tracker</h1>

      <label className={styles['listing-picker-label']} htmlFor="listingDate">
        Select date:
      </label>
      <input
        id="listingDate"
        type="date"
        className={styles['listing-picker-input']}
        value={currentDateStr}
        onChange={dateChangeHandler}
      />
      {content}
      <Link className={styles['open-modal-button']} to="add">
        Add New Meal
      </Link>
    </div>
  );
}
