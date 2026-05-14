import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './DetailPage.module.css';
import { TextContent } from '../components/common/TextContent';
import { useLoadData } from '../utils/useLoadData';
import { CaloriesContext } from '../CaloriesContext';
import Button from '../components/common/Button';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function DetailPage() {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);

  const { status, errorMsg, sendRequest } = useLoadData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { deleteMealRecord } = useContext(CaloriesContext);

  useEffect(() => {
    const fetchSingleRecord = async () => {
      try {
        const data = await sendRequest(
          `https://6a0170cf36fb6ad04de0ee2f.mockapi.io/records/${recordId}`
        );

        setRecord(data);
      } catch (error) {}
    };

    fetchSingleRecord();
  }, [recordId, sendRequest]);

  const deleteHandler = async () => {
    try {
      await deleteMealRecord(recordId);
      navigate('..');
    } catch (error) {
      alert(error.message);
    }
  };

  let content;

  switch (status) {
    case 'loading':
      content = <TextContent value="Loading meal details..." />;
      break;
    case 'error':
      content = <TextContent value={`Error: ${errorMsg}`} />;
      break;
    case 'success':
      content = (
        <div className={styles.container}>
          <div className={styles.item}>
            <span>Meal Type:</span>
            <span className={styles.secondSpan}>{record.meal}</span>
          </div>
          <div className={styles.item}>
            <span>Food Content:</span>
            <span>{record.content}</span>
          </div>
          <div className={styles.item}>
            <span>Calories:</span>
            <span>{record.calories} kcal</span>
          </div>
          <div className={styles.item}>
            <span>Date Added:</span>
            <span>{new Date(record.date).toLocaleDateString()}</span>
          </div>

          <div className={styles.detailPageFooter}>
            <Link to={`/track/edit/${recordId}`}>
              <Button variant="editButton">Edit Meal</Button>
            </Link>

            <Button variant="danger" onClick={() => setIsModalOpen(true)}>
              Delete Meal
            </Button>
          </div>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <main className={styles.detailPageContainer}>
      <header className={styles.header}>
        <h2 className={styles.title}>Record Details</h2>

        <Link to=".." relative="path" className={styles.backButton}>
          ← Back to list page
        </Link>
      </header>

      {content}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h3>Delete this record?</h3>
        <p>
          Are you sure you want to permanently delete this meal? This action
          cannot be undone.
        </p>

        <div className={styles.buttonsContainer}>
          <Button variant="primary" onClick={deleteHandler}>
            Yes, Delete
          </Button>

          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
}
