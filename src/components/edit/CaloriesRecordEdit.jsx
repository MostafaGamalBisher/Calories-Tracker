import { useEffect, useState } from 'react';
import styles from './CaloriesRecordEdit.module.css';

function CaloriesRecordEdit(props) {
  const [mealRecord, setMealRecord] = useState({});

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

    setMealRecord({
      date: '',
      meal: 'Breakfast',
      content: '',
      calories: '',
    });
  };

  const isFormValid =
    mealRecord.date &&
    mealRecord.meal &&
    mealRecord.content &&
    mealRecord.calories;

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        name="date"
        id="date"
        value={mealRecord.date || ''}
        onChange={onDateChangeHandler}
        required
      />
      <label>Meal:</label>
      <select
        required
        value={mealRecord.meal || ''}
        onChange={onMealChangeHandler}
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
        required
      />
      <label htmlFor="Calories">Calories:</label>
      <input
        type="number"
        name="Calories"
        id="Calories"
        value={mealRecord.calories || ''}
        onChange={onCaloriesChangeHandler}
        className={`${styles['calories-input']} ${mealRecord.calories < 0 ? styles.error : ''}`}
        min="0"
        required
      />
      <div className={styles.footer}>
        <button type="submit" disabled={!isFormValid}>
          Add Record
        </button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
