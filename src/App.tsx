import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
