import { Routes, Route } from 'react-router-dom';
import Examens from '../pages/Examens/Examens';
import Home from '../pages/Dashboard/Dashboard';
import EditExamen from '../pages/EditExamen';

import AddExamen from '../pages/AddExamen/AddExamen';
import Dashboard from '../pages/Dashboard/Dashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/examens" element={<Examens />} />
      <Route path="/ajouter" element={<AddExamen />} /> {/* 👈 ici */}
      <Route path="/modifier" element={<EditExamen />} />

    </Routes>
  );
}

export default AppRoutes;
