import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">ListAqui</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
          <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium">Entrar</Link>
          <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">Cadastre-se</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;