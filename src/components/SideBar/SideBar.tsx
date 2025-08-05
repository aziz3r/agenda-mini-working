import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemarques, addRemarque, deleteRemarque } from '../../features/remarques/remarquesSlice';
import { AppDispatch, RootState } from '../../redux/store';

const Sidebar = () => {
  const [remarque, setRemarque] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { remarques, loading, error } = useSelector((state: RootState) => state.remarques);

  useEffect(() => {
    dispatch(fetchRemarques());
  }, [dispatch]);

  const handleAdd = () => {
    if (remarque.trim() !== '') {
      console.log('🟨 Envoi remarque :', remarque);
      dispatch(addRemarque(remarque.trim()));
      setRemarque('');
    }
  };

  const handleRemove = (id: number) => {
    dispatch(deleteRemarque(id));
  };

  useEffect(() => {
    console.log('📌 Données remarques Redux:', remarques);
  }, [remarques]);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🗒️ Remarques</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Ajouter une remarque..."
          value={remarque}
          onChange={(e) => setRemarque(e.target.value)}
        />
        <button onClick={handleAdd}>➕</button>
      </div>
      {loading && <p>Chargement...</p>}
      {error && <p className="error-message">Erreur : {error}</p>}
      <ul className="remarques-list">
        {remarques.map((item) => (
          <li key={item.id}>
            <label>
              <input type="checkbox" onChange={() => handleRemove(item.id)} />
              <span>{item.texte}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;