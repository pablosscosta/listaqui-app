import React from 'react';
import { Link } from 'react-router-dom';

const HouseCard = ({ house }) => {
    return (
        <Link to={`/houses/${house.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                <h2 className="text-2xl font-semibold text-gray-800">{house.name}</h2>
            </div>
        </Link>
    );
};

export default HouseCard;