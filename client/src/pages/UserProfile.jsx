import React from 'react';
import LogoutButton from '../components/LogoutButton';  // Assurez-vous que le chemin est correct

function UserProfile() {
    return (
        <div>
            <h1>Votre Profil</h1>
            {/* Autres éléments du profil */}
            <LogoutButton />  // Bouton de déconnexion
        </div>
    );
}

export default UserProfile;
