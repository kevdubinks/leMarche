import React from 'react';
import LogoutButton from '../components/LogoutButton';  // Assurez-vous que le chemin est correct

function AdminDashboard() {
    return (
        <div>
            <h1>Dashboard Administrateur</h1>
            {/* Autres éléments du dashboard */}
            <LogoutButton />  // Bouton de déconnexion
        </div>
    );
}

export default AdminDashboard;
