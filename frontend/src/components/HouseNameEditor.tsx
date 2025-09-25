import React, { useState } from 'react';
import axios from 'axios';

interface HouseNameEditorProps {
  houseId: number;
  initialName: string;
  onNameUpdated: () => void;
}

const HouseNameEditor: React.FC<HouseNameEditorProps> = ({ houseId, initialName, onNameUpdated }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axios.patch(`/api/houses/${houseId}/`, { name: name });
      onNameUpdated();
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar nome da casa:', error);
      alert('Não foi possível atualizar o nome.');
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleUpdate} className="house-name-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
      </form>
    );
  }

  return (
    <div className="house-name-display">
      <h1>{initialName}</h1>
      <button onClick={() => setIsEditing(true)}>Editar Nome</button>
    </div>
  );
};

export default HouseNameEditor;