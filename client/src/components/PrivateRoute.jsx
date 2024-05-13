// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Assurez-vous que le chemin est correct

function PrivateRoute({ children, role }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    } else if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PrivateRoute;
