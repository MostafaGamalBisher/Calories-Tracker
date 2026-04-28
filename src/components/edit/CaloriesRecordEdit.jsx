import { useState } from 'react';
import './CaloriesRecordEdit.css';

function CaloriesRecordEdit() {
  // const [maxCalories, setMaxCalories] = useState(0);
  // const [dateValue, setDateValue] = useState();
  // const [mealValue, setMealValue] = useState();
  // const [contentValue, setContentValue] = useState();
  // const [caloriesValue, setCaloriesValue] = useState();

  const [mealRecord, setMealRecord] = useState({});

  const onDateChangeHandler = (e) => {
    setMealRecord({ ...mealRecord, date: e.target.value });
  };
  const onMealChangeHandler = (e) => {
    setMealRecord({ ...mealRecord, meal: e.target.value });
  };
  const onContentChangeHandler = (e) => {
    setMealRecord({ ...mealRecord, content: e.target.value });
  };
  const onCaloriesChangeHandler = (e) => {
    setMealRecord({ ...mealRecord, calories: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({
      mealRecord,
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date" onChange={onDateChangeHandler} />
      <label>Meal:</label>
      <select onChange={onMealChangeHandler}>
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
        onChange={onContentChangeHandler}
      />
      <label htmlFor="Calories">Calories:</label>
      <input
        type="number"
        name="Calories"
        id="Calories"
        onChange={onCaloriesChangeHandler}
      />
      <div className="footer">
        <button>Add Record</button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
