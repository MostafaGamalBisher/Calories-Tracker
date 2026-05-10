import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const REDIRECT_COUNT = 10;
const COUNT_DOWN_INTERVAL = 1000;
const HOME_LINK = '/';

export function ErrorPage() {
  const [counter, setCounter] = useState(REDIRECT_COUNT);
  const intervalHandler = useRef();
  const NavigateToHome = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalHandler.current);
      NavigateToHome(HOME_LINK);
    }
  });

  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, COUNT_DOWN_INTERVAL);

    return () => {
      clearInterval(intervalHandler.current);
    };
  }, []);

  return (
    <>
      <h1>Something went wrong...</h1>
      <p>Redirecting to Home Page in {counter}</p>
      <p>
        Or Click <Link to={HOME_LINK}>Home Page</Link>to go back
      </p>
    </>
  );
}
