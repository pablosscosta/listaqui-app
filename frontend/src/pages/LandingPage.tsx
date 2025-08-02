import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto text-center py-20 px-4">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">Organize sua vida. Colabore com sua casa.</h1>
          <p className="text-xl text-gray-600 mb-8">
            ListAqui é a solução definitiva para gerenciar listas de compras mensais e emergenciais, e ainda comparar preços para economizar.
          </p>
          <a href="/signup" className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg text-lg hover:bg-green-700 transition-colors">
            Começar Agora
          </a>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-20 px-4">
          <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Listas Mensais Inteligentes</h3>
              <p className="text-gray-600">Planeje suas compras com antecedência e nunca mais esqueça de nada.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Compare Preços e Economize</h3>
              <p className="text-gray-600">Rastreie os preços dos seus itens favoritos e tome decisões inteligentes.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Colaboração em Tempo Real</h3>
              <p className="text-gray-600">Compartilhe listas com sua família e editem juntos, em tempo real.</p>
            </div>
          </div>
        </section>

        {/* About Me Section (Portfólio) */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre o Desenvolvedor</h2>
            <p className="text-lg text-gray-600 mb-6">
              ListAqui é um exemplo prático de como a tecnologia pode ser usada para criar soluções eficientes. O código-fonte e outros trabalhos do desenvolvedor estão disponíveis para consulta no portfólio, no LinkedIn e no repositório no GitHub.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <a href="#" className="text-green-600 hover:text-green-800 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
                Meu GitHub
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-green-600 hover:text-green-800 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
                Meu Portfólio
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-green-600 hover:text-green-800 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
                Meu LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;