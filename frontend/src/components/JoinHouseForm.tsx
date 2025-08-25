import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const JoinHouseForm = ({ onHouseJoined }) => {
    const { tokens } = useAuth();
    const [code, setCode] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');

        if (!code) {
            setStatusMessage('Por favor, insira um código.');
            return;
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/houses/join/',
                { code },
                {
                    headers: {
                        'Authorization': `Bearer ${tokens.access}`
                    }
                }
            );
            setStatusMessage('Você entrou na casa com sucesso!');
            setCode('');
            onHouseJoined();
        } catch (error) {
            console.error('Falha ao entrar na casa:', error.response.data);
            if (error.response.data.error) {
                setStatusMessage(`Erro: ${error.response.data.error}`);
            } else {
                setStatusMessage('Falha ao entrar na casa. Tente novamente.');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Entrar em uma Casa</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">
                        Código da Casa
                    </label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Entrar
                    </button>
                </div>
            </form>
            {statusMessage && <p className={`mt-4 text-center ${statusMessage.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{statusMessage}</p>}
        </div>
    );
};

export default JoinHouseForm;