import React from 'react';

const HouseCard = ({ house }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800">{house.name}</h2>
            <p className="text-gray-500">Código: {house.code}</p>
        </div>
    );
};

export default HouseCard;