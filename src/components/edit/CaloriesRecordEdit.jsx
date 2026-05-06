import { useEffect, useState } from 'react';
import styles from './CaloriesRecordEdit.module.css';

function CaloriesRecordEdit(props) {
  const DEFAULT_STATE = {
    date: '',
    meal: 'Breakfast',
    content: '',
    calories: 0,
  };

  const [mealRecord, setMealRecord] = useState(DEFAULT_STATE);

  // useEffect(() => {
  //   let seconds = 0;

  //   // We start a timer that runs every 1000ms (1 second)
  //   const formTimer = setInterval(() => {
  //     seconds++;
  //     console.log(`⏱️ Form open for: ${seconds} seconds`);
  //   }, 1000);

  //   return () => {
  //     console.log('🛑 Modal closed! Destroying the timer.');
  //     clearInterval(formTimer);
  //   };
  // }, []);

  const onDateChangeHandler = (e) => {
    setMealRecord((pervValue) => ({ ...pervValue, date: e.target.value }));
  };
  const onMealChangeHandler = (e) => {
    setMealRecord((pervValue) => ({ ...pervValue, meal: e.target.value }));
  };
  const onContentChangeHandler = (e) => {
    setMealRecord((pervValue) => ({ ...pervValue, content: e.target.value }));
  };
  const onCaloriesChangeHandler = (e) => {
    setMealRecord((pervValue) => ({ ...pervValue, calories: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !mealRecord.date ||
      !mealRecord.content ||
      !mealRecord.meal ||
      !mealRecord.calories
    ) {
      alert('Please fill out all fields before submitting!');
      return;
    }

    const completeRecord = {
      ...mealRecord,
      id: Date.now(),
      date: new Date(mealRecord.date),
      calories: Number(mealRecord.calories),
    };

    props.onFormSubmit(completeRecord);

    setMealRecord(DEFAULT_STATE);
  };

  const isSports =
    mealRecord.content?.toLowerCase() === 'sport' ||
    mealRecord.content?.toLowerCase() === 'sports';

  const isDateValid = !!mealRecord.date;
  const isMealValid = !!mealRecord.meal;
  const isContentValid = !!mealRecord.content;

  const isCaloriesValid =
    mealRecord.calories !== '' &&
    (isSports || Number(mealRecord.calories) >= 0);

  const isFormValid =
    isDateValid && isMealValid && isContentValid && isCaloriesValid;

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        name="date"
        id="date"
        value={mealRecord.date || ''}
        onChange={onDateChangeHandler}
        className={`${styles['form-input']} ${mealRecord.date !== undefined && !isDateValid ? styles.error : ''}`}
        required
      />
      <label>Meal:</label>
      <select
        required
        value={mealRecord.meal || ''}
        onChange={onMealChangeHandler}
        className={`${styles['form-input']} ${mealRecord.meal !== undefined && !isMealValid ? styles.error : ''}`}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <label htmlFor="Content">Content:</label>
      <input
        type="text"
        name="Content"
        id="Content"
        value={mealRecord.content || ''}
        onChange={onContentChangeHandler}
        className={`${styles['form-input']} ${mealRecord.content !== undefined && !isContentValid ? styles.error : ''}`}
        required
      />
      <label htmlFor="Calories">Calories:</label>
      <input
        type="number"
        name="Calories"
        id="Calories"
        value={mealRecord.calories}
        onChange={onCaloriesChangeHandler}
        className={`${styles['form-input']} ${mealRecord.calories !== 0 && !isCaloriesValid ? styles.error : ''}`}
        required
      />
      <div className={styles.footer}>
        <button type="submit" disabled={!isFormValid}>
          Add Record
        </button>
        <button
          className={styles.secondary}
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
