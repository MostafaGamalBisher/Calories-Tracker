import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  LandingPage,
  TrackPage,
  PageLayout,
  ErrorPage,
  DetailPage,
} from './pages';
import TrackLayout from './pages/TrackLayout';
import { FormPage } from './pages/FormPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <PageLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <LandingPage />,
        },
        {
          path: 'track',
          element: <TrackLayout />,
          children: [
            { index: true, element: <TrackPage /> },

            { path: 'add', element: <FormPage /> },

            { path: ':recordId', element: <DetailPage /> },
          ],
        },
      ],
    },
  ],
  {
    basename: '/Calories-Tracker',
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
