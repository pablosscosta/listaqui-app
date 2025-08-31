import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import HouseCard from '../components/HouseCard';
import { useNavigate, Link } from 'react-router-dom';

const DashboardPage = () => {
    const { tokens, logout } = useAuth();
    const [houses, setHouses] = useState([]);
    const navigate = useNavigate();

    const fetchHouses = async () => {
        if (!tokens || !tokens.access) {
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
        }
    };

    useEffect(() => {
        fetchHouses();
    }, [tokens]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Suas Casas</h1>
                <div className="flex gap-4">
                    <Link
                        to="/create-house"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Criar Nova Casa
                    </Link>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sair
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {houses.length > 0 ? (
                    houses.map(house => (
                        <HouseCard
                            key={house.id}
                            house={house}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">Nenhuma casa encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;