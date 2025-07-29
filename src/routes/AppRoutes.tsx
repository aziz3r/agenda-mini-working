import { Routes, Route } from 'react-router-dom';
import Examens from '../pages/Examens';
import Home from '../pages/Dashboard';
import EditExamen from '../pages/EditExamen';

import AddExamen from '../pages/AddExamen';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/examens" element={<Examens />} />
      <Route path="/ajouter" element={<AddExamen />} /> {/* 👈 ici */}
      <Route path="/modifier/:id" element={<EditExamen />} />
    </Routes>
  );
}

export default AppRoutes;
