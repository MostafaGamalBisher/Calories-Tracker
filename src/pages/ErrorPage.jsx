import { Link } from 'react-router-dom';
import { useNavCountDown } from '../utils/useNavCountDown';

const HOME_LINK = '/';

export function ErrorPage() {
  const counter = useNavCountDown(HOME_LINK, 10);

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
