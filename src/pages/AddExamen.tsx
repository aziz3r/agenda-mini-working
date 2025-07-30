import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Génération UUID

const AddExamen = () => {
  const navigate = useNavigate();

  const [idexam, setIdexam] = useState('');
  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [poids, setPoids] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idexam || !nom || !date || isNaN(Number(poids))) {
      setError("❌ Remplis tous les champs.");
      return;
    }

    const examReference = uuidv4(); // 🆕 nom du champ unique

    try {
      await axios.post("http://localhost:1337/api/exams", {
        data: {
          examReference,
          idexam,
          nom,
          date,
          poids: Number(poids),
        },
      });

      alert("✅ Examen ajouté !");
      navigate('/examens');
    } catch (err: any) {
      console.error("❌ Erreur lors de la création :", err.response?.data || err);
      setError("❌ Échec de la création.");
    }
  };

  return (
    <div>
      <h2>➕ Ajouter un examen</h2>
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
          <input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} required />
        </div>
        <button type="submit">✅ Ajouter</button>
      </form>
    </div>
  );
};

export default AddExamen;



