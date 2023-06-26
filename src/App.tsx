import { Route, Routes } from 'react-router-dom';

import Error from './component/Error/Error';

import './App.css';
import WeatherDetail from './component/WeatherDetail';
import { HomaPage, WeatherPage } from './pages';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomaPage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/weather/:slug" element={<WeatherDetail />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
