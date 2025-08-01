import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamens } from '../../features/examens/examenSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import Sidebar from '../../components/SideBar/SideBar';
import './Examens.css';

const Examens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isOpen: isSidebarOpen } = useSidebar();

  const { examens, loading, error } = useSelector((state: RootState) => state.examens);

  useEffect(() => {
    dispatch(fetchExamens());
  }, [dispatch]);

  const handleModifier = (documentId: string) => {
    localStorage.setItem('currentDocumentId', documentId);
    navigate('/modifier');
  };

  return (
    <div className="examens-root">
      <div className="examens-main">
        <h1>🧾 Liste des examens</h1>

        {loading && <p>Chargement...</p>}
        {error && <p className="error-message">Erreur : {error}</p>}

        {!loading && !error && (
          <ul className="examens-list">
            {examens.map((examen) => (
              <li key={examen.id}>
                <strong>{examen.nom}</strong><br />
                ID Strapi : {examen.id} <br />
                ID examen : {examen.idexam}<br />
                📅 {examen.date}<br />
                ⚖️ Poids : {examen.poids}<br />
                🔗 Référence : {examen.examReference || <em>(non définie)</em>}<br />

                <button onClick={() => handleModifier(examen.examReference)}>
                  ✏️ Modifier
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isSidebarOpen && (
        <aside className="examens-sidebar">
          <Sidebar />
        </aside>
      )}
    </div>
  );
};

export default Examens;
