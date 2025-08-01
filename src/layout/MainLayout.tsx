import { useSidebar } from '../context/SidebarContext';
import Sidebar from '../components/SideBar/SideBar';
import './MainLayout.css';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();

  return (
    <div className="layout-container">
      <div className="main-content">
        <div className={`page-content ${isOpen ? 'with-sidebar' : ''}`}>
          {children}
        </div>
        {isOpen && (
          <div className="sidebar">
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
