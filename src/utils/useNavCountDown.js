import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useNavCountDown(redirectLink, countDown) {
  const [counter, setCounter] = useState(countDown);
  const intervalHandler = useRef();
  const Navigate = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalHandler.current);
      Navigate(redirectLink);
    }
  });

  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalHandler.current);
    };
  }, []);

  return counter;
}
