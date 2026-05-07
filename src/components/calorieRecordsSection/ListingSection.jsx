import RecordList from './RecordList';
import styles from './ListingSection.module.css';
import { CaloriesContext } from '../../CaloriesContext';
import { useContext } from 'react';

function ListingSection() {
  const { currentDate, setCurrentDate, currentDateStr } =
    useContext(CaloriesContext);

  const dateChangeHandler = (e) => {
    setCurrentDate(new Date(e.target.value));
  };

  return (
    <>
      <label className={styles['listing-picker-label']} htmlFor="listingDate">
        Select date:
      </label>
      <input
        id="listingDate"
        type="date"
        className={styles['listing-picker-input']}
        // value={currentDate.toISOString().split('T')[0]}
        value={currentDateStr}
        onChange={dateChangeHandler}
      />
      <RecordList />
    </>
  );
}

export default ListingSection;
