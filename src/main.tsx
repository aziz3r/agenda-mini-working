import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SidebarProvider } from './context/SidebarContext';

// Sécurité : on vérifie que l'élément #root existe bien
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('❌ Élement root introuvable dans le HTML');
}

const root = ReactDOM.createRoot(rootElement);

// Rendu de l’application avec tous les providers
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </Provider>
  </React.StrictMode>
);
