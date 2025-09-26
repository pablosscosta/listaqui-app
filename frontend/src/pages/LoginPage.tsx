import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate('/', { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
        setError('Nome de usuário ou senha inválidos.');
      } else {
        setError('Ocorreu um erro ao tentar fazer login.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>Entrar no Gerenciador</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="username">Usuário</label>
        <input 
          type="text" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label htmlFor="password">Senha</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;