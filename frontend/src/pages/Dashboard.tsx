import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ListComponent from '../components/ListComponent';
import HouseNameEditor from '../components/HouseNameEditor'; // Novo Import

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

interface IHouse {
  id: number;
  name: string;
  lists: IList[];
}

const Dashboard: React.FC = () => {
  const [house, setHouse] = useState<IHouse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHouseData = useCallback(async () => {
    try {
      const response = await axios.get<IHouse[]>('/api/houses/');
      if (response.data.length > 0) {
        setHouse(response.data[0]);
      } else {
        setError('Nenhuma casa encontrada. Algo deu errado na criação inicial.');
      }
    } catch (err) {
      setError('Falha ao carregar dados da API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHouseData();
  }, [fetchHouseData]);

  if (loading) {
    return <div>Carregando dashboard...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      {house && (
        <HouseNameEditor 
          houseId={house.id}
          initialName={house.name}
          onNameUpdated={fetchHouseData} // Usa o mesmo callback para recarregar
        />
      )}
      <p>ID da Casa: {house?.id}</p>

      <h2>Minhas Listas</h2>
      {house?.lists.map(list => (
        <ListComponent 
          key={list.id} 
          list={list} 
          onDataChange={fetchHouseData} 
        />
      ))}
    </div>
  );
};

export default Dashboard;