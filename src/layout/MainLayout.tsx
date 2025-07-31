import { useSidebar } from '../context/SidebarContext';
import Sidebar from '../components/SideBar/SideBar';
import './MainLayout.css';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();

  return (
    <div className="main-layout">
      <div className="main-content" style={{ marginRight: isOpen ? '250px' : '0' }}>
        {children}
      </div>
      {isOpen && <Sidebar />}
    </div>
  );
};

export default MainLayout;
