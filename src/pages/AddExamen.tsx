import { useState } from 'react';
import axios from 'axios';

const AddExamen = () => {
  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [poids, setPoids] = useState('');
  const [idexam, setIdexam] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1337/api/exams", {
        data: {
          nom,
          date,
          poids: Number(poids),
          idexam,
        }
      });

      alert('✅ Examen ajouté avec succès !');
      console.log(response.data);
    } catch (error) {
      console.error('❌ Erreur lors de l’ajout de l’examen :', error);
    }
  };

  return (
    <div>
      <h2>➕ Ajouter un examen</h2>
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
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddExamen;

