import { CaloriesContext } from '../../CaloriesContext';
import { useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import styles from './CaloriesRecordEdit.module.css';
import FormInput from '../common/FormInput';
import Button from '../common/Button';

const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const DEFAULT_STATE = {
  date: '',
  meal: 'Breakfast',
  content: '',
  calories: 0,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };

    case 'RESET_FORM':
      return DEFAULT_STATE;

    default:
      return state;
  }
}

function CaloriesRecordEdit(props) {
  const { totalCalories, setCurrentDate, addMealRecord, currentDateStr } =
    useContext(CaloriesContext);

  const contentRef = useRef();

  const [mealRecord, dispatch] = useReducer(
    formReducer,
    DEFAULT_STATE,
    (initialState) => ({
      ...initialState,
      // date: currentDate.toISOString().split('T')[0],
      date: currentDateStr,
    })
  );

  useEffect(() => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'date',
      // value: currentDate.toISOString().split('T')[0],
      value: currentDateStr,
    });
  }, [currentDateStr]);

  useEffect(() => {
    contentRef.current.focus();
  }, []);

  const onDateChangeHandler = useCallback(
    (event) => {
      dispatch({
        type: 'UPDATE_FIELD',
        field: 'date',
        value: event.target.value,
      });
      setCurrentDate(new Date(event.target.value));
    },
    [setCurrentDate]
  );

  const onMealChangeHandler = useCallback((event) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'meal',
      value: event.target.value,
    });
  }, []);

  const onContentChangeHandler = useCallback((event) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'content',
      value: event.target.value,
    });
  }, []);

  const onCaloriesChangeHandler = useCallback((event) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'calories',
      value: Number(event.target.value),
    });
  }, []);

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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !mealRecord.date ||
      !mealRecord.content ||
      !mealRecord.meal ||
      mealRecord.calories === ''
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

    addMealRecord(completeRecord);

    dispatch({ type: 'RESET_FORM' });

    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories} calories</p>
      <FormInput
        label="Date"
        type="date"
        name="date"
        id="date"
        value={mealRecord.date || ''}
        onChange={onDateChangeHandler}
        isValid={mealRecord.date === undefined ? true : isDateValid}
        required
      />
      <FormInput
        label="Meal"
        type="select"
        required
        value={mealRecord.meal || ''}
        onChange={onMealChangeHandler}
        isValid={mealRecord.meal === undefined ? true : isMealValid}
        options={MEAL_OPTIONS}
      ></FormInput>
      <FormInput
        label="Content"
        type="text"
        name="Content"
        id="Content"
        ref={contentRef}
        value={mealRecord.content || ''}
        onChange={onContentChangeHandler}
        isValid={mealRecord.content === undefined ? true : isContentValid}
        required
      />
      <FormInput
        label="Calories"
        type="number"
        name="Calories"
        id="Calories"
        value={mealRecord.calories}
        onChange={onCaloriesChangeHandler}
        isValid={mealRecord.calories === 0 ? true : isCaloriesValid}
        required
      />
      <div className={styles.footer}>
        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Add Record
        </Button>
        <Button variant="secondary" type="button" onClick={props.onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
