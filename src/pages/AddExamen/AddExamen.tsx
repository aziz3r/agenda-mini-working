import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddExamen.css';

const AddExamen = () => {
  const navigate = useNavigate();

  const [idexam, setIdexam] = useState('');
  const [nom, setNom] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [poids, setPoids] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idexam || !nom || !date || isNaN(Number(poids))) {
      setError("❌ Remplis tous les champs.");
      return;
    }

    const examReference = uuidv4();

    try {
      await axios.post("http://localhost:1337/api/exams", {
        data: {
          examReference,
          idexam,
          nom,
          date: date.toISOString(),
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
    <div className="add-container">
      <h2 className="add-title">➕ Ajouter un examen</h2>
      {error && <p className="add-error">{error}</p>}
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label>ID Examen :</label>
          <input value={idexam} onChange={(e) => setIdexam(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Nom :</label>
          <input value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date :</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Sélectionne la date et l'heure"
            className="custom-datepicker"
          />
        </div>
        <div className="form-group">
          <label>Poids :</label>
          <input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} required />
        </div>
        <button type="submit" className="add-button">✅ Ajouter</button>
      </form>
    </div>
  );
};

export default AddExamen;




