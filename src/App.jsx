import RecordList from './components/RecordList';

function App() {
  const records = [
    {
      date: new Date(2023, 2, 1),
      meal: 'breakfast',
      content: 'eggs',
      calories: 340,
    },
    {
      date: new Date(2023, 2, 2),
      meal: 'launch',
      content: 'cosa',
      calories: 20,
    },
    {
      date: new Date(2023, 2, 3),
      meal: 'dinner',
      content: 'water',
      calories: 2000,
    },
    {
      date: new Date(2023, 2, 4),
      meal: 'snacks',
      content: 'shai koshary',
      calories: 34,
    },
  ];

  return (
    <div className="App">
      <h1>Welcome to React with Almdrasa!</h1>
      <RecordList records={records}></RecordList>
    </div>
  );
}

export default App;
