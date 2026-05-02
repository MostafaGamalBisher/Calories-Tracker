import { useEffect, useState } from 'react';

import CaloriesRecordEdit from './components/edit/CaloriesRecordEdit';
import ListingSection from './components/calorieRecordsSection/ListingSection';

function App() {
  const [records, setRecords] = useState(() => {
    const savedRecordsString = localStorage.getItem('myTrackerData');

    if (savedRecordsString) {
      const parsedArray = JSON.parse(savedRecordsString);
      return parsedArray.map((record) => ({
        ...record,
        date: new Date(record.date),
      }));
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('myTrackerData', JSON.stringify(records));
  }, [records]);

  const formSubmitHandler = (newRecordFromChild) => {
    setRecords((prevRecords) => {
      return [newRecordFromChild, ...prevRecords];
    });
  };

  return (
    <div className="App">
      <h1>Welcome to React with Almdrasa!</h1>
      <CaloriesRecordEdit onFormSubmit={formSubmitHandler} />
      <ListingSection allRecords={records} />
    </div>
  );
}

export default App;
