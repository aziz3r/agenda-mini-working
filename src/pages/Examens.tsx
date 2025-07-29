import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamens } from '../features/examens/examenSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Link } from 'react-router-dom';

const Examens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { examens, loading, error } = useSelector((state: RootState) => state.examens);

  useEffect(() => {
    dispatch(fetchExamens());
  }, [dispatch]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div>
      <h1>Liste des examens 📝</h1>
      <ul>
{examens.map((examen) => {
  console.log("🕵️ Examen affiché dans la liste :", examen); // <-- AJOUT ICI

  return (
<li key={examen.id}>
  <strong>{examen.nom}</strong><br />
  ID Strapi : {examen.id} <br />
  ID examen : {examen.idexam}<br />
  📅 {examen.date}<br />
  ⚖️ Poids : {examen.poids}<br />
  <Link to={`/modifier/${examen.id}`}>✏️ Modifier</Link>
</li>

  );
})}



      </ul>
    </div>
  );
};

export default Examens;
