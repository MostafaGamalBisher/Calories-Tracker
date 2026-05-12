import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './DetailPage.module.css';
import { TextContent } from '../components/common/TextContent'; // Reusing your awesome component!

export function DetailPage() {
  // 1. Grab the ID from the URL
  const { recordId } = useParams();

  // 2. Set up our trusted Status Machine!
  const [status, setStatus] = useState('loading');
  const [record, setRecord] = useState(null); // This will hold our single meal object
  const [errorMsg, setErrorMsg] = useState('');

  // 3. Fetch the single record when the page loads
  useEffect(() => {
    const fetchSingleRecord = async () => {
      setStatus('loading');
      try {
        // Notice we append the exact recordId to the URL!
        const response = await fetch(
          `https://6a0170cf36fb6ad04de0ee2f.mockapi.io/records/${recordId}`
        );

        if (!response.ok) {
          throw new Error('Could not find this meal in the database.');
        }

        const data = await response.json();

        // Save the single meal to state and open the curtain!
        setRecord(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setErrorMsg(error.message);
      }
    };

    fetchSingleRecord();
  }, [recordId]); // We add recordId to the dependency array so it refetches if the URL changes

  // 4. The Traffic Cop (Switch Statement)
  let content;

  switch (status) {
    case 'loading':
      content = <TextContent value="Loading meal details..." />;
      break;
    case 'error':
      content = <TextContent value={`Error: ${errorMsg}`} />;
      break;
    case 'success':
      // The API worked! We use the CSS classes you provided to make it look clean.
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
      <h2 style={{ textAlign: 'center' }}>Record Details</h2>

      {/* 5. Render the content chosen by the Status Machine */}
      {content}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to=".." relative="path">
          ← Back to list page
        </Link>
      </div>
    </>
  );
}
