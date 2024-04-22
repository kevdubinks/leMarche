// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage';
// Importez d'autres pages ici

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Définissez d'autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;
