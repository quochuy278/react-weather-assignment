import { Route, Routes } from 'react-router-dom';

import Weather from './component/Weather/Weather';
import Error from './component/Error/Error';

import './App.css';
function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Weather />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
