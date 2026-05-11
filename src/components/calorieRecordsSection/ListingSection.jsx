import RecordList from './RecordList';
import styles from './ListingSection.module.css';
import { CaloriesContext } from '../../CaloriesContext';
import { useContext } from 'react';
import { TextContent } from '../common/TextContent';

function ListingSection() {
  const { setCurrentDate, currentDateStr, isLoading } =
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
        value={currentDateStr}
        onChange={dateChangeHandler}
      />
      {isLoading ? <TextContent value="Loading..." /> : <RecordList />}
    </>
  );
}

export default ListingSection;
