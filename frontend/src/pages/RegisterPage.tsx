import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      await registerUser({ username, email, password });
      setSuccess('Usuário registrado com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
      
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data;
        if (data.username) setError(`Nome de usuário: ${data.username[0]}`);
        else if (data.email) setError(`Email: ${data.email[0]}`);
        else setError('Ocorreu um erro ao registrar o usuário.');
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>Criar Nova Conta</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <label htmlFor="username">Usuário</label>
        <input 
          type="text" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label htmlFor="password">Senha (mín. 6 caracteres)</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;