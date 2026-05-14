import { CaloriesContext } from '../CaloriesContext';
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import styles from './FormPage.module.css';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoadData } from '../utils/useLoadData';

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

    case 'SET_FORM':
      return action.payload;

    default:
      return state;
  }
}

export function FormPage() {
  const {
    totalCalories,
    setCurrentDate,
    addMealRecord,
    updateMealRecord,
    currentDateStr,
  } = useContext(CaloriesContext);

  const navigate = useNavigate();

  const { recordId } = useParams();
  const isEditMode = Boolean(recordId);
  const { sendRequest } = useLoadData();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentRef = useRef();

  const cancelHandler = () => {
    navigate('..');
  };

  const [mealRecord, dispatch] = useReducer(
    formReducer,
    DEFAULT_STATE,
    (initialState) => ({
      ...initialState,
      date: currentDateStr,
    })
  );

  useEffect(() => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'date',
      value: currentDateStr,
    });
  }, [currentDateStr]);

  useEffect(() => {
    contentRef.current.focus();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchExistingMeal = async () => {
        try {
          const data = await sendRequest(
            `https://6a0170cf36fb6ad04de0ee2f.mockapi.io/records/${recordId}`
          );

          const dateObj = new Date(data.date);
          const formattedDateForInput = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

          dispatch({
            type: 'SET_FORM',
            payload: {
              date: formattedDateForInput,
              meal: data.meal,
              content: data.content,
              calories: data.calories,
            },
          });
        } catch (error) {
          alert('Could not load the meal data.');
        }
      };
      fetchExistingMeal();
    }
  }, [isEditMode, recordId, sendRequest]);

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

  const onSubmitHandler = async (e) => {
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

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateMealRecord(recordId, completeRecord);
      } else {
        completeRecord.id = Date.now();
        await addMealRecord(completeRecord);
      }
      dispatch({ type: 'RESET_FORM' });

      navigate('..');
    } catch {
      alert('Something went wrong saving your meal!');
    } finally {
      setIsSubmitting(false);
    }
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
        <Button
          variant="primary"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Add Record'}
        </Button>
        <Button variant="secondary" type="button" onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
