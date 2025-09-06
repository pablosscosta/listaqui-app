import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-1 container mx-auto p-4 md:p-8">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <Link to="/dashboard" className="inline-block mb-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        &larr; Voltar para a Dashboard
                    </Link>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{house.name}</h1>
                    <p className="text-gray-600 mb-1">Código: <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">{house.code}</span></p>
                    <p className="text-gray-600 mb-6">Membros: <span className="text-gray-900 font-medium">{house.members.map(member => member.name).join(', ')}</span></p>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Listas</h2>
                    {lists.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Alteração: o div agora é um Link */}
                            {lists.map(list => (
                                <Link key={list.id} to={`/houses/${id}/lists/${list.id}`} className="bg-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 block">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{list.title}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{list.list_type}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Nenhuma lista encontrada.</p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HouseDetailsPage;