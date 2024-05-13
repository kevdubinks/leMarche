// Dans LogoutButton.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Adaptez le chemin selon votre structure

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');  // Redirige après déconnexion
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
export default LogoutButton
// Utilisez ce bouton dans les composants nécessaires au lieu de l'utiliser comme une route.
