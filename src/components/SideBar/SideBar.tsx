import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addRemarque, fetchRemarques } from '../../features/remarques/remarquesSlice';
import './SideBar.css';

const SideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [texte, setTexte] = useState('');
  const { remarques, error } = useSelector((state: RootState) => state.remarques);

  useEffect(() => {
    dispatch(fetchRemarques());
  }, [dispatch]);

  const handleAdd = async () => {
    if (texte.trim()) {
      await dispatch(addRemarque(texte));
      setTexte('');
      dispatch(fetchRemarques()); // 🟢 recharge après ajout
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🗒️ Remarques</h2>

      <div className="input-group">
        <input
          type="text"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Ajouter une remarque..."
        />
        <button onClick={handleAdd}>➕</button>
      </div>

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <ul>
        {remarques.map((r) => (
          <li key={r.id}>✅ {r.remarque}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
