import './CaloriesRecordEdit.css';

function CaloriesRecordEdit() {
  return (
    <form>
      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date" />
      <label>Meal:</label>
      <select>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <label htmlFor="Content">Content:</label>
      <input type="text" name="Content" id="Content" />
      <label htmlFor="Calories">Calories:</label>
      <input type="number" name="Calories" id="Calories" />
      <div className="footer">
        <button>Add Record</button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
