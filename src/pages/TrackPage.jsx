import { useState } from 'react';
import Modal from 'react-modal';
import CaloriesRecordEdit from '../components/edit/CaloriesRecordEdit';
import ListingSection from '../components/calorieRecordsSection/ListingSection';
import styles from './TrackPage.module.css';
import { CaloriesContextProvider } from '../CaloriesContext';

Modal.setAppElement('#root');

export function TrackPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CaloriesContextProvider>
      <div className="App">
        <h1 className={styles.title}>Calories Tracker</h1>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className={styles['my-custom-modal']}
          overlayClassName={styles['my-custom-overlay']}
        >
          <CaloriesRecordEdit onCancel={() => setIsModalOpen(false)} />
        </Modal>
        <ListingSection />

        <button
          className={styles['open-modal-button']}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Meal
        </button>
      </div>
    </CaloriesContextProvider>
  );
}
