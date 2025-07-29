import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditExamen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [poids, setPoids] = useState('');
  const [idexam, setIdexam] = useState('');
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!id || isNaN(Number(id)) || Number(id) <= 0) {
    setError("❌ ID invalide, redirection en cours...");
    navigate('/examens'); // 🔁 Redirection vers la liste
    return;
  }

  console.log("Fetching examen id:", id);
  axios.get(`http://localhost:1337/api/exams/${id}`)
    .then((res) => {
      const data = res.data?.data;
      if (data) {
        setIdexam(data.idexam ?? '');
        setNom(data.nom ?? '');
        setDate(data.date ?? '');
        setPoids(data.poids?.toString() ?? '');
      } else {
        setError("Examen non trouvé.");
      }
    })
    .catch((err) => {
      console.error("Erreur Axios :", err);
      setError("Erreur lors du chargement de l'examen.");
    });
}, [id]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1337/api/exams/${id}`, {
        data: {
          idexam,
          nom,
          date,
          poids: Number(poids),
        }
      });
      alert("✅ Examen mis à jour avec succès !");
      navigate('/examens');
    } catch (err) {
      console.error("❌ Erreur lors de la mise à jour :", err);
      setError("❌ Impossible de mettre à jour l'examen.");
    }
  };

  return (
    <div>
      <h2>✏️ Modifier un examen</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Examen :</label>
          <input value={idexam} onChange={(e) => setIdexam(e.target.value)} required />
        </div>
        <div>
          <label>Nom :</label>
          <input value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div>
          <label>Date :</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Poids :</label>
          <input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} />
        </div>
        <button type="submit">💾 Enregistrer</button>
      </form>
    </div>
  );
};

export default EditExamen;
