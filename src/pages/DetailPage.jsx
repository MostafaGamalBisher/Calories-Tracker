import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './DetailPage.module.css';
import { TextContent } from '../components/common/TextContent';
import { useLoadData } from '../utils/useLoadData';

export function DetailPage() {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);

  const { status, errorMsg, sendRequest } = useLoadData();

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
            <span>{record.meal}</span>
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
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <>
      <h2 className={styles.title}>Record Details</h2>

      {content}

      <div className={styles.backButton}>
        <Link to=".." relative="path">
          ← Back to list page
        </Link>
      </div>
    </>
  );
}
