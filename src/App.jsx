import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import CaloriesRecordEdit from './components/edit/CaloriesRecordEdit';
import ListingSection from './components/calorieRecordsSection/ListingSection';
import styles from './App.module.css';

Modal.setAppElement('#root');

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1 className={styles.title}>Calories Tracker</h1>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={styles['my-custom-modal']}
        overlayClassName={styles['my-custom-overlay']}
      >
        <CaloriesRecordEdit
          onFormSubmit={formSubmitHandler}
          onCancel={() => setIsModalOpen(false)}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </Modal>
      <ListingSection
        allRecords={records}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <button
        className={styles['open-modal-button']}
        onClick={() => setIsModalOpen(true)}
      >
        Add New Meal
      </button>
    </div>
  );
}

export default App;
