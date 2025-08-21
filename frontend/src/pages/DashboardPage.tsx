import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardPage = () => {
    const { isAuthenticated, tokens } = useAuth();
    const [houses, setHouses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHouses = async () => {
            if (!isAuthenticated || !tokens || !tokens.access) {
                console.log("Condição de retorno foi acionada. isAuthenticated:", isAuthenticated, "tokens:", tokens);
                return;
            }

            console.log("Fazendo requisição com o token:", tokens.access);

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/houses/', {
                    headers: {
                        'Authorization': `Bearer ${tokens.access}`
                    }
                });
                setHouses(response.data);
            } catch (err) {
                console.error('Failed to fetch houses:', err);
                setError('Failed to load houses. Please try again.');
            }
        };

        fetchHouses();
    }, [isAuthenticated, tokens]);

    if (error) {
        return <div className="text-red-500 text-center mt-8">{error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center my-6">Seus Grupos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {houses.length > 0 ? (
                        houses.map(house => (
                            <div key={house.id} className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-semibold text-gray-800">{house.name}</h2>
                                <p className="text-gray-500">Código: {house.code}</p>
                                <ul className="mt-4 space-y-2">
                                    {/* Aqui você pode adicionar a lógica para exibir as listas */}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            Nenhum grupo encontrado.
                        </p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;