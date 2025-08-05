// src/pages/Examens/ExamensTable.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchExamens } from '../../features/examens/examenSlice';
import './examenTable.css';


const ITEMS_PER_PAGE = 5;

const ExamensTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { examens, loading, error } = useSelector((state: RootState) => state.examens);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchExamens());
  }, [dispatch]);

  const totalPages = Math.ceil(examens.length / ITEMS_PER_PAGE);
  const currentItems = examens.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📋 Liste des Examens</h2>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">Erreur : {error}</p>}

      {!loading && !error && (
        <>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">#</th>
                <th className="p-2 border">ID Examen</th>
                <th className="p-2 border">Nom</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Poids</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((exam, index) => (
                <tr key={exam.id}>
                  <td className="p-2 border">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="p-2 border">{exam.idexam}</td>
                  <td className="p-2 border">{exam.nom}</td>
                  <td className="p-2 border">{new Date(exam.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{exam.poids}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
        <div className="custom-pagination">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    ◀️ Précédent
  </button>

  <span>Page {currentPage} / {totalPages}</span>

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Suivant ▶️
  </button>
</div>


        </>
      )}
    </div>
  );
};

export default ExamensTable;
