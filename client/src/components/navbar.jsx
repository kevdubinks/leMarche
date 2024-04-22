// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import "./Navbar.css"; // N'oubliez pas de créer le fichier de style correspondant

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          mapetitebrocante.fr</Link>
        <nav className="nav">
        <Link to="/vétements" className="nav-item">
             Styles à Travers les Temps
          </Link>
        <Link to="/décorations" className="nav-item">
         Espaces Inspirés
          </Link>
          <Link to="/musiques" className="nav-item">
            Échos Musicaux
          </Link>
          <Link to="/laTeam" className="nav-item">
            Les Compagnons
          </Link>
         
          {/* Ajoutez d'autres liens de navigation ici si nécessaire */}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
