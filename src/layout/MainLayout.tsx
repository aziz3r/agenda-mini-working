// src/layout/MainLayout.tsx
import React from 'react';
import Sidebar from '../components/SideBar/SideBar';
import './MainLayout.css'; // 🔥 Ajoute un fichier CSS pour gérer le layout

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-layout">
      <div className="main-content">{children}</div>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
