// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage';
import CreateProductForm from './pages/CreateProductForm';
import Login from './components/login';
import Register from './components/register';
// Importez d'autres pages ici

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Définissez d'autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;
