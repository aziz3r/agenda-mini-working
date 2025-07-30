import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [remarque, setRemarque] = useState('');
  const [remarques, setRemarques] = useState<string[]>([]);

  const handleAdd = () => {
    if (remarque.trim() !== '') {
      setRemarques([...remarques, remarque.trim()]);
      setRemarque('');
    }
  };

  const handleRemove = (indexToRemove: number) => {
    setRemarques(remarques.filter((_, index) => index !== indexToRemove));
  };

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
      <ul className="remarques-list">
        {remarques.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleRemove(index)}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
