
import React from 'react';

const StatCard = ({ type, location }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white">{type}</h3>
            <p className="text-gray-400">{location}</p>
        </div>
    );
};

export default StatCard;