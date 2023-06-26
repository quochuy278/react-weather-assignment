import { Route, Routes } from 'react-router-dom';

import WeatherTable from './component/WeatherTable/WeatherTable';
import Error from './component/Error/Error';

import './App.css';
import Weather from './component/Weather/Weather';
import WeatherChart from './component/WeatherChart/WeatherChart';
function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Weather />} />
      <Route path="/table" element={<WeatherTable />} />
      <Route path="/chart" element={<WeatherChart />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
