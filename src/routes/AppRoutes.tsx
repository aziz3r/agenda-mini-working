import { Routes, Route } from 'react-router-dom';
import Examens from '../pages/Examens/Examens';
import AddExamen from '../pages/AddExamen/AddExamen';
import EditExamen from '../pages/EditExamen';
import Dashboard from '../pages/Dashboard/Dashboard';
import MainLayout from '../layout/MainLayout'; // ✅ nouveau layout

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/examens"
        element={
          <MainLayout>
            <Examens />
          </MainLayout>
        }
      />
      <Route
        path="/ajouter"
        element={
          <MainLayout>
            <AddExamen />
          </MainLayout>
        }
      />
      <Route
        path="/modifier"
        element={
          <MainLayout>
            <EditExamen />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
