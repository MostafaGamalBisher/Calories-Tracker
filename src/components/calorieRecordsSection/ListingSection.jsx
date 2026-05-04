import RecordList from './RecordList';
import styles from './ListingSection.module.css';
import { useEffect, useState } from 'react';

function ListingSection(props) {
  const { allRecords } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [user, setUser] = useState(null);

  const dateChangeHandler = (e) => {
    setCurrentDate(new Date(e.target.value));
  };

  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getUser = async () => {
    console.log('request init');

    const response = await fetch('https://randomuser.me/api/');

    const data = await response.json();

    const fetchedUser = data.results[0];

    setUser({
      id: fetchedUser.login.uuid,
      firstName: fetchedUser.name.first,
      lastName: fetchedUser.name.last,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
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
        <RecordList records={allRecords.filter(dateFilter)} />

        <p>Loading user profile...</p>
      </>
    );
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
        value={currentDate.toISOString().split('T')[0]}
        onChange={dateChangeHandler}
      />
      <RecordList records={allRecords.filter(dateFilter)} />

      <p>{user.id}</p>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
    </>
  );
}

export default ListingSection;
