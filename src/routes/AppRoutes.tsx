import { Routes, Route } from 'react-router-dom';
import Examens from '../pages/Examens/Examens';
import AddExamen from '../pages/AddExamen/AddExamen';
import EditExamen from '../pages/EditExamen/EditExamen';
import Dashboard from '../pages/Dashboard/Dashboard';
import ExamensTable from '../pages/Examens/examenTable';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/examens" element={<Examens />} />
      <Route path="/ajouter" element={<AddExamen />} />
      <Route path="/modifier" element={<EditExamen />} />
      <Route path="/examens-table" element={<ExamensTable />} />

    </Routes>
  );
}

export default AppRoutes;
