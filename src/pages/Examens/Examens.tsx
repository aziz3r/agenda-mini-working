import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamens } from '../../features/examens/examenSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import './Examens.css';


const Examens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { examens, loading, error } = useSelector((state: RootState) => state.examens);

  useEffect(() => {
    dispatch(fetchExamens());
  }, [dispatch]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  const handleModifier = (documentId: string) => {
    localStorage.setItem('currentDocumentId', documentId); // 🟡 Enregistre la référence d'examen
    navigate('/modifier'); // 🟡 Redirige vers page de modification
  };

  return (
    <div>
      <h1>🧾 Liste des examens</h1>
      <ul>
        {examens.map((examen) => {
          console.log("🕵️ Examen affiché dans la liste :", examen);

          return (
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
          );
        })}
      </ul>
    </div>
  );
};

export default Examens;

