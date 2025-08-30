import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const CreateListForm = ({ house, onListCreated }) => {
    const { tokens } = useAuth();
    const [title, setTitle] = useState('');
    const [listType, setListType] = useState('MONTHLY'); // Adicionado o novo estado
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');

        if (!title) {
            setStatusMessage('O nome da lista é obrigatório.');
            return;
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/houses/${house.id}/lists/`,
                { 
                    title,
                    list_type: listType // Enviando o tipo de lista para o back-end
                },
                {
                    headers: {
                        'Authorization': `Bearer ${tokens.access}`
                    }
                }
            );
            setStatusMessage('Lista criada com sucesso!');
            setTitle('');
            setListType('MONTHLY');
            
            setTimeout(() => {
                onListCreated();
            }, 1500);
        } catch (error) {
            console.error('Falha ao criar lista:', error.response.data);
            if (error.response && error.response.data && error.response.data.error) {
                setStatusMessage(`Erro: ${error.response.data.error}`);
            } else {
                setStatusMessage('Falha ao criar lista. Tente novamente.');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Criar uma Nova Lista</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Nome da Lista
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="listType" className="block text-gray-700 text-sm font-bold mb-2">
                        Tipo de Lista
                    </label>
                    <select
                        id="listType"
                        value={listType}
                        onChange={(e) => setListType(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="MONTHLY">Mensal</option>
                        <option value="EMERGENCY">Emergencial</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Criar Lista
                    </button>
                </div>
            </form>
            {statusMessage && <p className={`mt-4 text-center ${statusMessage.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{statusMessage}</p>}
        </div>
    );
};

export default CreateListForm;