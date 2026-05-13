import Modal from 'react-modal';

import ListingSection from '../components/calorieRecordsSection/ListingSection';
import styles from './TrackPage.module.css';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

export function TrackPage() {
  return (
    <div className="App">
      <h1 className={styles.title}>Calories Tracker</h1>

      <ListingSection />

      <Link className={styles['open-modal-button']} to="add">
        Add New Meal
      </Link>
    </div>
  );
}
