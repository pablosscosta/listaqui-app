import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LandingPage = () => {
  const { tokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se o usuário já tiver um token, ele está logado e deve ser redirecionado para o dashboard
    if (tokens) {
      navigate('/dashboard');
    }
  }, [tokens, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo(a) à sua Central da Casa</h1>
        <p className="text-gray-600 mb-6">
          Organize tarefas e listas de forma simples e eficiente.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;