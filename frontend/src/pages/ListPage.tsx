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
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItemName, setEditedItemName] = useState('');
    const [editedItemQuantity, setEditedItemQuantity] = useState(1); // NOVO estado para a quantidade

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
                description: newItem.name,
                amount: newItem.quantity,
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

    const handleCompleteItem = async (itemId) => {
        try {
            const itemToUpdate = list.items.find(item => item.id === itemId);
            const newCompletedStatus = !itemToUpdate.is_completed;

            await axios.patch(`http://127.0.0.1:8000/api/houses/${houseId}/lists/${listId}/items/${itemId}/`, {
                is_completed: newCompletedStatus
            }, {
                headers: { 'Authorization': `Bearer ${tokens.access}` }
            });

            setList(prevList => ({
                ...prevList,
                items: prevList.items.map(item =>
                    item.id === itemId ? { ...item, is_completed: newCompletedStatus } : item
                )
            }));
        } catch (error) {
            console.error("Failed to toggle item completion:", error);
        }
    };

    const handleClearList = async () => {
        try {
            const itemsToClear = list.items.filter(item => item.is_completed);
            const deletePromises = itemsToClear.map(item =>
                axios.delete(`http://127.0.0.1:8000/api/houses/${houseId}/lists/${listId}/items/${item.id}/`, {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                })
            );

            await Promise.all(deletePromises);

            setList(prevList => ({
                ...prevList,
                items: prevList.items.filter(item => !item.is_completed)
            }));
        } catch (error) {
            console.error("Failed to clear list:", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/houses/${houseId}/lists/${listId}/items/${itemId}/`, {
                headers: { 'Authorization': `Bearer ${tokens.access}` }
            });

            setList(prevList => ({
                ...prevList,
                items: prevList.items.filter(item => item.id !== itemId)
            }));
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };
    
    const handleStartEdit = (item) => {
        setEditingItemId(item.id);
        setEditedItemName(item.description);
        setEditedItemQuantity(item.amount); // Atualiza a quantidade ao iniciar a edição
    };

    const handleSaveEdit = async (itemId) => {
        try {
            const res = await axios.patch(`http://127.0.0.1:8000/api/houses/${houseId}/lists/${listId}/items/${itemId}/`, {
                description: editedItemName,
                amount: editedItemQuantity // Envia a quantidade atualizada
            }, {
                headers: { 'Authorization': `Bearer ${tokens.access}` }
            });

            setList(prevList => ({
                ...prevList,
                items: prevList.items.map(item =>
                    item.id === itemId ? { ...item, description: res.data.description, amount: res.data.amount } : item
                )
            }));
            setEditingItemId(null);
            setEditedItemName('');
            setEditedItemQuantity(1); // Reseta o estado da quantidade
        } catch (error) {
            console.error("Failed to save item:", error);
        }
    };
    
    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditedItemName('');
        setEditedItemQuantity(1); // Reseta o estado da quantidade
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
                            <div className="text-gray-900 font-medium">{item.description}</div>
                            <div className="text-gray-700">{item.amount}</div>
                            <div>
                                <button className="text-indigo-600 hover:text-indigo-900 transition-colors">Ações</button>
                            </div>
                            <div className="hidden md:block text-gray-700">R$ {item.price ? item.price.toFixed(2) : '0.00'}</div>
                            <div className="hidden md:block text-gray-700">R$ {(item.price * item.quantity).toFixed(2)}</div>
                            <div className="hidden md:block">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.is_completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {item.is_completed ? 'Comprado' : 'A Comprar'}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-100">
                    <div>Item</div>
                    <div>Quantidade</div>
                    <div>Status</div>
                    <div>Ações</div>
                </div>
                {list.items.length > 0 ? (
                    list.items.map(item => (
                        <div key={item.id} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            {editingItemId === item.id ? (
                                <input
                                    type="text"
                                    value={editedItemName}
                                    onChange={(e) => setEditedItemName(e.target.value)}
                                    className="p-1 border rounded-md w-full"
                                />
                            ) : (
                                <div className={`text-gray-900 font-medium ${item.is_completed ? 'line-through' : ''}`}>
                                    {item.description}
                                </div>
                            )}
                            {editingItemId === item.id ? (
                                <input
                                    type="number"
                                    value={editedItemQuantity}
                                    onChange={(e) => setEditedItemQuantity(parseInt(e.target.value, 10))}
                                    className="p-1 border rounded-md w-full"
                                />
                            ) : (
                                <div className="text-gray-700">{item.amount}</div>
                            )}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={item.is_completed}
                                    onChange={() => handleCompleteItem(item.id)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className={`ml-2 px-2 py-1 text-xs leading-5 font-semibold rounded-full ${item.is_completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {item.is_completed ? 'Comprado' : 'A Comprar'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {editingItemId === item.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSaveEdit(item.id)}
                                            className="p-1 rounded-full text-green-600 hover:bg-green-100 transition-colors"
                                            title="Salvar Edição"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                                            title="Cancelar Edição"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleStartEdit(item)}
                                            className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                                            title="Editar Item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                                            title="Excluir Item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-gray-500">
                        <p>Nenhum item adicionado ainda.</p>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <button
                    onClick={handleClearList}
                    className="w-full px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors"
                >
                    Limpar Lista
                </button>
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