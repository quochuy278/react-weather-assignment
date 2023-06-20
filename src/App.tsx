import { Route, Routes } from 'react-router-dom';

import WeatherTable from './component/WeatherTable/WeatherTable';
import Error from './component/Error/Error';

import './App.css';
function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/table" element={<WeatherTable />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
