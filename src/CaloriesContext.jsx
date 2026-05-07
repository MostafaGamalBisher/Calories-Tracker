import { createContext, useState, useEffect } from 'react';

export const CaloriesContext = createContext();

export function CaloriesContextProvider(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  // Extract the local date pieces safely
  const year = currentDate.getFullYear();
  // Months are 0-indexed in JS (January is 0), so we add 1.
  // padStart(2, '0') ensures "May" becomes "05" instead of just "5"
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Combine them into the exact string HTML needs
  const safeDateStr = `${year}-${month}-${day}`;

  const [records, setRecords] = useState(() => {
    const savedRecordsString = localStorage.getItem('myTrackerData');
    if (savedRecordsString) {
      const parsedArray = JSON.parse(savedRecordsString);
      return parsedArray.map((record) => ({
        ...record,
        date: new Date(record.date),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('myTrackerData', JSON.stringify(records));
  }, [records]);

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

  const addMealRecord = (newRecord) => {
    setRecords((prevRecords) => [newRecord, ...prevRecords]);
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
      }}
    >
      {props.children}
    </CaloriesContext.Provider>
  );
}
