import { createContext, useState, useEffect } from 'react';
import { useLoadData } from './utils/useLoadData';

export const CaloriesContext = createContext();

export function CaloriesContextProvider(props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const safeDateStr = `${year}-${month}-${day}`;

  const [records, setRecords] = useState([]);

  const { status, errorMsg, sendRequest } = useLoadData();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await sendRequest(
          'https://6a0170cf36fb6ad04de0ee2f.mockapi.io/records'
        );

        const formattedData = data.map((record) => ({
          ...record,
          date: new Date(record.date),
        }));

        setRecords(formattedData);
      } catch (error) {}
    };

    fetchRecords();
  }, [sendRequest]);

  const dailyRecords = records.filter((record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    );
  });

  const totalCalories = dailyRecords.reduce(
    (agg, cur) => agg + cur.calories,
    0
  );

  const addMealRecord = async (newRecord) => {
    try {
      const response = await fetch(
        'https://6a0170cf36fb6ad04de0ee2f.mockapi.io/records',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRecord),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save to the cloud!');
      }

      const savedRecord = await response.json();

      const formattedRecord = {
        ...savedRecord,
        date: new Date(savedRecord.date),
      };

      setRecords((prevRecords) => [formattedRecord, ...prevRecords]);

      return formattedRecord;
    } catch (error) {
      console.error('Error adding record:', error);

      throw error;
    }
  };

  const deleteMealRecord = async (id) => {
    try {
      const response = await fetch(
        `https://6a0170cf36fb6ad04de0ee2f.mockapi.io/records/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete the record!');
      }

      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== id)
      );
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  };

  const updateMealRecord = async (id, updatedRecord) => {
    try {
      const response = await fetch(
        `https://6a0170cf36fb6ad04de0ee2f.mockapi.io/records/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRecord),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update the record!');
      }

      const savedRecord = await response.json();
      const formattedRecord = {
        ...savedRecord,
        date: new Date(savedRecord.date),
      };

      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === id ? formattedRecord : record
        )
      );

      return formattedRecord;
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  };

  return (
    <CaloriesContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        dailyRecords,
        totalCalories,
        addMealRecord,
        currentDateStr: safeDateStr,
        status,
        errorMsg,
        deleteMealRecord,
        updateMealRecord,
      }}
    >
      {props.children}
    </CaloriesContext.Provider>
  );
}
