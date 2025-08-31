import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const HouseDetailsPage = () => {
    const { id } = useParams();
    const { tokens } = useAuth();
    const [house, setHouse] = useState(null);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        if (!tokens) return;

        const fetchHouseDetails = async () => {
            try {
                const houseRes = await axios.get(`http://127.0.0.1:8000/api/houses/${id}/`, {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                });
                setHouse(houseRes.data);

                const listsRes = await axios.get(`http://127.0.0.1:8000/api/houses/${id}/lists/`, {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                });
                setLists(listsRes.data);
            } catch (error) {
                console.error('Failed to fetch house details:', error);
            }
        };

        fetchHouseDetails();
    }, [id, tokens]);

    if (!house) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{house.name}</h1>
            <p className="text-gray-600 mb-2">Código: {house.code}</p>
            <p className="text-gray-600 mb-4">Membros: {house.members.join(', ')}</p>
            <Link to="/dashboard" className="text-blue-500 hover:underline mb-4 block">
                &larr; Voltar para a Dashboard
            </Link>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Listas</h2>
            {lists.length > 0 ? (
                <ul className="list-disc list-inside">
                    {lists.map(list => (
                        <li key={list.id} className="text-gray-700">
                            {list.title} - {list.list_type}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Nenhuma lista encontrada.</p>
            )}
        </div>
    );
};

export default HouseDetailsPage;