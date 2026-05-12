import RecordList from './RecordList';
import styles from './ListingSection.module.css';
import { CaloriesContext } from '../../CaloriesContext';
import { useContext } from 'react';
import { TextContent } from '../common/TextContent';

function ListingSection() {
  const { setCurrentDate, currentDateStr, dailyRecords, errorMsg, status } =
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
      if (dailyRecords.length === 0) {
        content = <TextContent value="No records found for this day" />;
      } else {
        content = <RecordList />;
      }
      break;
    default:
      content = null;
  }
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
      {content}
    </>
  );
}

export default ListingSection;
