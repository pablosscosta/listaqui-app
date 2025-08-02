import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChooseHousePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo(a) ao ListAqui!</h2>
          <p className="text-gray-600 mb-6">
            Para começar, você pode criar uma nova casa ou entrar em uma que já existe.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 p-6 bg-green-50 rounded-lg border border-green-200 shadow-sm transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-green-700">Criar Nova Casa</h3>
              <p className="mt-2 text-gray-600">
                Seja o(a) administrador(a) da sua casa e convide outras pessoas.
              </p>
              <button className="mt-4 w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
                Criar Casa
              </button>
            </div>
            <div className="flex-1 p-6 bg-blue-50 rounded-lg border border-blue-200 shadow-sm transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-blue-700">Entrar em uma Casa</h3>
              <p className="mt-2 text-gray-600">
                Junte-se a uma casa existente com um código de convite.
              </p>
              <button className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Entrar em Casa
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChooseHousePage;