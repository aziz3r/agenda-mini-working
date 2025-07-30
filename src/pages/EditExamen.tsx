import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditExamen = () => {
  const navigate = useNavigate();

  const [idexam, setIdexam] = useState('');
  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [poids, setPoids] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 🔁 Charger les données actuelles de l'examen à modifier
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

        // On prend ici le plus ancien
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
      // 1. Créer le nouvel examen modifié
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

      // 2. Récupérer tous les examens liés à examReference
      const res = await axios.get(
        `http://localhost:1337/api/exams?filters[examReference][$eq]=${reference}`
      );
      const exams = res.data.data;

      // 3. Supprimer l’examen le plus ancien ≠ nouvellement créé
      const examToDelete = exams
        .filter((e: any) => e.id !== newExamId)
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )[0];

      if (examToDelete) {
        await axios.delete(`http://localhost:1337/api/exams/${examToDelete.id}`);
        console.log("🗑️ Ancien examen supprimé :", examToDelete.id);
      }

      alert("✅ Examen modifié avec succès !");
      navigate('/examens');
    } catch (err: any) {
      console.error("❌ Erreur :", err);
      setError("❌ Une erreur est survenue : " + (err.response?.data?.error?.message || "Inconnue."));
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
          <input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} required />
        </div>
        <button type="submit">💾 Remplacer</button>
      </form>
    </div>
  );
};

export default EditExamen;

