import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // chemin relatif

const Navbar = () => {
  return (
    <nav>
      <Link to="/">🏠 Accueil</Link>
      <Link to="/examens">📝 Examens</Link>
      <Link to="/ajouter">➕ Ajouter</Link>
    </nav>
  );
};

export default Navbar;
