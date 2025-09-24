import React from 'react';
import ItemForm from './ItemForm';
import ItemComponent from './ItemComponent'; // Novo Import

interface IItem {
  id: number;
  name: string;
  purchased: boolean;
}

interface IList {
  id: number;
  name: string;
  items: IItem[];
}

interface ListProps {
  list: IList;
  onDataChange: () => void; // Prop renomeada para ser genérica
}

const ListComponent: React.FC<ListProps> = ({ list, onDataChange }) => {
  return (
    <div className="list-card">
      <h3>{list.name}</h3>
      <div className="item-list">
        {list.items.map((item) => (
          // Substitui o placeholder pelo componente funcional ItemComponent
          <ItemComponent 
            key={item.id} 
            item={item} 
            listId={list.id} 
            onDataChange={onDataChange} 
          />
        ))}
        {list.items.length === 0 && <p>Nenhum item nesta lista.</p>}
      </div>

      <ItemForm listId={list.id} onItemAdded={onDataChange} />
    </div>
  );
};

export default ListComponent;