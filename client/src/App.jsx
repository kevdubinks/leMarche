import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage';
import CreateProductForm from './pages/CreateProductForm';
import Login from './components/login';
import Register from './components/Register';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';  // Assurez-vous que PrivateRoute est bien défini
import { AuthProvider } from './context/AuthContext'
function App() {
  return (
    <AuthProvider> 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/profile" element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        } />
        <Route path="/admin/dashboard" element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />
        {/* Retirez la route /logout et intégrez LogoutButton dans UserProfile et AdminDashboard */}
      </Routes>
    </Router>
    </AuthProvider> 
  );
}

export default App;
