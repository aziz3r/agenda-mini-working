import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/SideBar/SideBar';
import { useSidebar } from './context/SidebarContext';
import './App.css';

function App() {
  const { isOpen } = useSidebar();

  return (
    <BrowserRouter>
      <Navbar />
      <div className={`layout-container ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {isOpen && <Sidebar />}
        <div className="main-content">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
