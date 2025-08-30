import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const HouseCard = ({ house, onListCreated }) => {
    const { tokens } = useAuth();
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchLists = async () => {
            if (!tokens || !tokens.access) {
                return;
            }

            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/houses/${house.id}/lists/`,
                    {
                        headers: {
                            'Authorization': `Bearer ${tokens.access}`
                        }
                    }
                );
                setLists(response.data);
            } catch (err) {
                console.error('Failed to fetch lists:', err);
            }
        };

        fetchLists();
    }, [tokens, house.id, onListCreated]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800">{house.name}</h2>
            <p className="text-gray-500">Código: {house.code}</p>
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Listas</h3>
                {lists.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {lists.map(list => (
                            <li key={list.id} className="text-gray-700">
                                {list.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Nenhuma lista encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default HouseCard;