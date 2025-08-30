import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const CreateHouseForm = ({ onHouseCreated }) => {
    const { tokens } = useAuth();
    const [name, setName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');

        if (!name) {
            setStatusMessage('O nome da casa é obrigatório.');
            return;
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/houses/',
                { name },
                {
                    headers: {
                        'Authorization': `Bearer ${tokens.access}`
                    }
                }
            );
            setStatusMessage('Casa criada com sucesso!');
            setName('');
            if (onHouseCreated) {
                onHouseCreated();
            }
        } catch (error) {
            console.error('Falha ao criar casa:', error.response.data);
            if (error.response && error.response.data && error.response.data.name) {
                setStatusMessage(`Erro: ${error.response.data.name[0]}`);
            } else {
                setStatusMessage('Falha ao criar casa. Tente novamente.');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Criar uma Nova Casa</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Nome da Casa
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Criar Casa
                    </button>
                </div>
            </form>
            {statusMessage && <p className={`mt-4 text-center ${statusMessage.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{statusMessage}</p>}
        </div>
    );
};

export default CreateHouseForm;