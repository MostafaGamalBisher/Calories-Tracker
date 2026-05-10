import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <>
      <p>Welcome to Claories Tracker App</p>
      <p>
        To Get Started!, <Link to="/track">Start tracking</Link>
      </p>
    </>
  );
}
