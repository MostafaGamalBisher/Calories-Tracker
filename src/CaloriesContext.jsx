import { createContext, useState, useEffect } from 'react';

export const CaloriesContext = createContext();

export function CaloriesContextProvider(props) {
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');

  const [currentDate, setCurrentDate] = useState(new Date());
  // Extract the local date pieces safely
  const year = currentDate.getFullYear();
  // Months are 0-indexed in JS (January is 0), so we add 1.
  // padStart(2, '0') ensures "May" becomes "05" instead of just "5"
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Combine them into the exact string HTML needs
  const safeDateStr = `${year}-${month}-${day}`;

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      setStatus('loading');
      setErrorMsg('');

      try {
        const response = await fetch(
          'https://6a0170cf36fb6ad04de0ee2f.mockapi.io/records'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const formattedData = data.map((record) => ({
          ...record,
          date: new Date(record.date),
        }));

        setRecords(formattedData);

        setStatus('success');
      } catch (error) {
        console.error('Failed to fetch records:', error);

        setStatus('error');
        setErrorMsg(error.message || 'Something went wrong.');
      }
      //  finally {
      //   setIsLoading(false);
      // }
    };

    fetchRecords();
  }, []);

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
      }}
    >
      {props.children}
    </CaloriesContext.Provider>
  );
}
