// src/pages/Home.jsx
//les meilleurs ventes de toutes vos brocantes 
import Navbar from '../components/navbar';
import './homePage.css'
// Assurez-vous que les styles de Home sont corrects

function Home() {
    return (
      <div className="home">
        <Navbar />
        <div className="slogan-container">
          <div className="slogan">
          "Chinez, découvrez, adoptez."
          </div>
        </div>
        {/* D'autres sections de votre page d'accueil ici */}
      </div>
    );
  }
  

export default Home;
//<h1>Bienvenue sur  mapetitebrocante.fr</h1>