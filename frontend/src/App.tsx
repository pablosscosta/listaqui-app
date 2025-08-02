import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChooseHousePage from './pages/ChooseHousePage';
import './index.css'; // Importa os estilos do Tailwind

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/choose-house" element={<ChooseHousePage />} />
        {/* Futuramente, outras rotas como /login e /signup virão aqui */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;