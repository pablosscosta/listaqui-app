import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute'; // <<< NOVA IMPORTAÇÃO

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rotas de Autenticação Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rota Privada: Protege o Dashboard */}
          <Route 
            path="/" 
            element={<PrivateRoute element={<Dashboard />} />} // <<< USO DO PrivateRoute
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;