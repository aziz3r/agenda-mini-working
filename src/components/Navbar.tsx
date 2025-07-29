import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: 20 }}>🏠 Accueil</Link>
      <Link to="/examens">📝 Examens</Link>
      <li>
  <Link to="/ajouter">➕ Ajouter</Link>
</li>

    </nav>
  );
};

export default Navbar;
