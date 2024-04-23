import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Components/Home';
import NoPage from './Components/NoPage';
import Topics from './Components/Topics/Topics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="topics" element={<Topics />} />
          <Route path="*" element={<NoPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
