import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateHousePage = () => {
    const [name, setName] = useState('');
    const { tokens } = useAuth();
    const navigate = useNavigate();

    const handleCreateHouse = async (e) => {
        e.preventDefault();
        if (!tokens || !tokens.access) {
            console.error('Tokens de acesso ausentes.');
            return;
        }

        try {
            await axios.post(
                'http://127.0.0.1:8000/api/houses/',
                { name },
                {
                    headers: {
                        'Authorization': `Bearer ${tokens.access}`
                    }
                }
            );
            navigate('/dashboard'); // Redireciona para o dashboard após a criação
        } catch (error) {
            console.error('Erro ao criar a casa:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Criar Nova Casa</h2>
                <form onSubmit={handleCreateHouse}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome da Casa</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Criar Casa
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/dashboard" className="text-blue-500 hover:underline">
                        Voltar para a Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateHousePage;