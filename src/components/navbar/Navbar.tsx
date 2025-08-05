import { useSidebar } from '../../context/SidebarContext';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="navbar-container">
      <div className="navbar">
        <nav>
          <Link to="/">🏠 Accueil</Link>
          <Link to="/examens">📝 Examens</Link>
          <Link to="/ajouter">➕ Ajouter</Link>
        <Link to="/examens-table">📋 Examens (Table)</Link>

          {/* Bouton Sidebar stylisé comme un lien */}
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            📅 To Do list
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
