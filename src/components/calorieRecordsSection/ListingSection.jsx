import RecordList from './RecordList';
import styles from './ListingSection.module.css';

function ListingSection(props) {
  const { records, setCurrentDate, currentDate, totalCalories } = props;

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
        value={currentDate.toISOString().split('T')[0]}
        onChange={dateChangeHandler}
      />
      <RecordList records={records} totalCalories={totalCalories} />
    </>
  );
}

export default ListingSection;
