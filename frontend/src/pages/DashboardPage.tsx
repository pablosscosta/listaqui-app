import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HouseCard from '../components/HouseCard';
import JoinHouseForm from '../components/JoinHouseForm';
import CreateHouseForm from '../components/CreateHouseForm';

const DashboardPage = () => {
    const { isAuthenticated, tokens } = useAuth();
    const [houses, setHouses] = useState([]);
    const [error, setError] = useState('');
    const [isCreating, setIsCreating] = useState(true);
    const [reloadHouses, setReloadHouses] = useState(false);

    useEffect(() => {
        const fetchHouses = async () => {
            if (!isAuthenticated || !tokens || !tokens.access) {
                return;
            }

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
    }, [isAuthenticated, tokens, reloadHouses]);

    const handleHouseJoined = () => {
        setReloadHouses(prev => !prev);
    };

    if (error) {
        return <div className="text-red-500 text-center mt-8">{error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center my-6">Seus Grupos</h1>
                
                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        onClick={() => setIsCreating(true)}
                        className={`px-4 py-2 font-bold rounded-lg focus:outline-none ${isCreating ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Criar Casa
                    </button>
                    <button
                        onClick={() => setIsCreating(false)}
                        className={`px-4 py-2 font-bold rounded-lg focus:outline-none ${!isCreating ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Entrar em uma Casa
                    </button>
                </div>
                
                <div className="flex justify-center mb-8">
                    {isCreating ? <CreateHouseForm /> : <JoinHouseForm onHouseJoined={handleHouseJoined} />}
                </div>

                {houses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {houses.map(house => (
                            <HouseCard key={house.id} house={house} />
                        ))}
                    </div>
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        Nenhum grupo encontrado.
                    </p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;