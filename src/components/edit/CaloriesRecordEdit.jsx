import { useState } from 'react';
import styles from './CaloriesRecordEdit.module.css';

function CaloriesRecordEdit(props) {
  // const [maxCalories, setMaxCalories] = useState(0);
  // const [dateValue, setDateValue] = useState();
  // const [mealValue, setMealValue] = useState();
  // const [contentValue, setContentValue] = useState();
  // const [caloriesValue, setCaloriesValue] = useState();

  const [mealRecord, setMealRecord] = useState({});

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
        min="1"
        required
      />
      <div className={styles.footer}>
        <button type="submit">Add Record</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
