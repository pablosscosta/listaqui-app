import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ListPage = () => {
    const { houseId, listId } = useParams();
    const { tokens } = useAuth();
    const [list, setList] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', quantity: 1, price: 0 });

    useEffect(() => {
        if (!tokens || !houseId || !listId) return;

        const fetchListDetails = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/houses/${houseId}/lists/${listId}/`, {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                });
                setList(res.data);
            } catch (error) {
                console.error("Failed to fetch list details:", error);
            }
        };

        fetchListDetails();
    }, [houseId, listId, tokens]);

    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/houses/${houseId}/lists/${listId}/items/`, {
                ...newItem,
                list: listId
            }, {
                headers: { 'Authorization': `Bearer ${tokens.access}` }
            });

            setList(prevList => ({
                ...prevList,
                items: [...prevList.items, res.data]
            }));
            setNewItem({ name: '', quantity: 1, price: 0 });
        } catch (error) {
            console.error("Failed to add new item:", error);
        }
    };

    if (!list) {
        return <div>Carregando...</div>;
    }

    const renderMonthlyList = () => (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Itens da Lista Mensal</h2>
            <form onSubmit={handleAddItem} className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome do Item</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ex: Arroz, Feijão..."
                            value={newItem.name}
                            onChange={handleNewItemChange}
                            className="mt-1 p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantidade</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="1"
                            value={newItem.quantity}
                            onChange={handleNewItemChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="flex items-end">
                        <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors">
                            Adicionar
                        </button>
                    </div>
                </div>
            </form>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-100">
                    <div>Item</div>
                    <div>Quantidade</div>
                    <div>Ações</div>
                    <div className="hidden md:block">Preço Unitário</div>
                    <div className="hidden md:block">Preço Total</div>
                </div>
                {list.items.length > 0 ? (
                    list.items.map(item => (
                        <div key={item.id} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="text-gray-900 font-medium">{item.name}</div>
                            <div className="text-gray-700">{item.quantity}</div>
                            <div>
                                <button className="text-indigo-600 hover:text-indigo-900 transition-colors">Ações</button>
                            </div>
                            <div className="hidden md:block text-gray-700">R$ {item.price ? item.price.toFixed(2) : '0.00'}</div>
                            <div className="hidden md:block text-gray-700">R$ {(item.price * item.quantity).toFixed(2)}</div>
                            <div className="hidden md:block">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.is_purchased ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {item.is_purchased ? 'Comprado' : 'A Comprar'}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-gray-500">
                        <p>Nenhum item adicionado ainda.</p>
                    </div>
                )}
            </div>
        </div>
    );

    const renderEmergencyList = () => (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Itens da Lista de Emergência</h2>
            <form onSubmit={handleAddItem} className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome do Item</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ex: Água, Leite..."
                            value={newItem.name}
                            onChange={handleNewItemChange}
                            className="mt-1 p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantidade</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="1"
                            value={newItem.quantity}
                            onChange={handleNewItemChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="flex items-end">
                        <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors">
                            Adicionar
                        </button>
                    </div>
                </div>
            </form>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-100">
                    <div>Item</div>
                    <div>Quantidade</div>
                    <div>Status</div>
                </div>
                {list.items.length > 0 ? (
                    list.items.map(item => (
                        <div key={item.id} className="grid grid-cols-2 sm:grid-cols-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="text-gray-900 font-medium">{item.name}</div>
                            <div className="text-gray-700">{item.quantity}</div>
                            <div>
                                <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${item.is_purchased ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {item.is_purchased ? 'Comprado' : 'A Comprar'}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-gray-500">
                        <p>Nenhum item adicionado ainda.</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            
            <main className="flex-1 container mx-auto p-4 md:p-8">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <Link to={`/houses/${houseId}`} className="inline-block mb-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        &larr; Voltar para a Casa
                    </Link>
                    
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{list.title}</h1>
                    <p className="text-gray-600 mb-6 capitalize">Tipo: {list.list_type}</p>
                    
                    {list.list_type.toLowerCase() === 'monthly' ? renderMonthlyList() : renderEmergencyList()}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ListPage;