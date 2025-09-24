import React, { useState } from 'react';
import axios from 'axios';

interface ItemFormProps {
  listId: number;
  onItemAdded: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ listId, onItemAdded }) => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    try {
      // Endpoint da API: /api/lists/<list_pk>/items/
      await axios.post(`/api/lists/${listId}/items/`, {
        name: itemName,
        // O campo 'list' é adicionado automaticamente no backend (perform_create)
      });
      
      setItemName('');
      onItemAdded(); // Chama a função para o Dashboard recarregar os dados
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      alert('Não foi possível adicionar o item. Verifique o servidor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <input
        type="text"
        placeholder="Nome do novo item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default ItemForm;