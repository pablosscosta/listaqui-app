import React from 'react';
import axios from 'axios';

interface IItem {
  id: number;
  name: string;
  purchased: boolean;
}

interface ItemProps {
  item: IItem;
  listId: number;
  onDataChange: () => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, listId, onDataChange }) => {
  const togglePurchased = async () => {
    try {
      // Requisição PUT para atualizar o status 'purchased'
      await axios.put(`/api/lists/${listId}/items/${item.id}/`, {
        ...item,
        purchased: !item.purchased,
      });
      onDataChange();
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const deleteItem = async () => {
    try {
      // Requisição DELETE
      await axios.delete(`/api/lists/${listId}/items/${item.id}/`);
      onDataChange();
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  return (
    <div className={`item-row ${item.purchased ? 'purchased' : ''}`}>
      <input 
        type="checkbox"
        checked={item.purchased}
        onChange={togglePurchased}
      />
      <span onClick={togglePurchased} style={{ textDecoration: item.purchased ? 'line-through' : 'none' }}>
        {item.name}
      </span>
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default ItemComponent;