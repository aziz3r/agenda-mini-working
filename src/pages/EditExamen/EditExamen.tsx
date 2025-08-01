import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSidebar } from '../../context/SidebarContext';
import Sidebar from '../../components/SideBar/SideBar';
import './EditExamen.css';

const EditExamen = () => {
  const navigate = useNavigate();
  const { isOpen: isSidebarOpen } = useSidebar();

  const [idexam, setIdexam] = useState('');
  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [poids, setPoids] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference = localStorage.getItem("currentDocumentId");
    if (!reference) {
      setError("❌ Référence absente.");
      return;
    }

    axios
      .get(`http://localhost:1337/api/exams?filters[examReference][$eq]=${reference}`)
      .then((res) => {
        const data = res.data.data;
        if (!data || data.length === 0) {
          setError("❌ Aucun examen trouvé.");
          return;
        }

        const examToEdit = data.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )[0];

        setIdexam(examToEdit.idexam || '');
        setNom(examToEdit.nom || '');
        setDate(examToEdit.date || '');
        setPoids(examToEdit.poids?.toString() || '');
      })
      .catch((err) => {
        console.error("❌ Erreur API :", err);
        setError("❌ Chargement échoué.");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reference = localStorage.getItem("currentDocumentId");
    if (!reference) {
      setError("❌ Référence manquante.");
      return;
    }

    try {
      const creationRes = await axios.post('http://localhost:1337/api/exams', {
        data: {
          examReference: reference,
          idexam,
          nom,
          date,
          poids: Number(poids),
        },
      });

      const newExamId = creationRes.data.data.id;

      const res = await axios.get(
        `http://localhost:1337/api/exams?filters[examReference][$eq]=${reference}`
      );
      const exams = res.data.data;

      const examToDelete = exams
        .filter((e: any) => e.id !== newExamId)
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )[0];

      if (examToDelete) {
        await axios.delete(`http://localhost:1337/api/exams/${examToDelete.id}`);
      }

      alert("✅ Examen modifié avec succès !");
      navigate('/examens');
    } catch (err: any) {
      console.error("❌ Erreur :", err);
      setError("❌ Une erreur est survenue : " + (err.response?.data?.error?.message || "Inconnue."));
    }
  };

  return (
    <div className="edit-root">
      <div className="edit-main">
        <div className="edit-container">
          <h2 className="edit-title">✏️ Modifier un examen</h2>
          {error && <p className="edit-error">{error}</p>}

          <form onSubmit={handleSubmit} className="edit-form">
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
              <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Poids :</label>
              <input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} required />
            </div>
            <button type="submit" className="edit-button">💾 Remplacer</button>
          </form>
        </div>
      </div>

      {isSidebarOpen && (
        <aside className="edit-sidebar">
          <Sidebar />
        </aside>
      )}
    </div>
  );
};

export default EditExamen;

