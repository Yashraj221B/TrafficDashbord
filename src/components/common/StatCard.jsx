
// import React from 'react';

// const StatCard = ({ type, location }) => {
//     return (
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-white">{type}</h3>
//             <p className="text-gray-400">{location}</p>
//         </div>
//     );
// };

// export default StatCard;

import React from 'react';

const StatCard = (props) => {
    // Check which props were passed to determine which version to render
    if (props.name !== undefined && props.value !== undefined) {
        // Render new version with name, value, icon, color
        const { name, value, icon: Icon, color } = props;
        return (
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                    <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
                        {Icon && <Icon className="h-6 w-6" style={{ color }} />}
                    </div>
                    <div className="ml-5">
                        <p className="text-gray-400 text-sm font-medium">{name}</p>
                        <h3 className="text-white text-xl font-semibold mt-1">{value}</h3>
                    </div>
                </div>
            </div>
        );
    } else {
        // Render original version with type and location
        const { type, location } = props;
        return (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-white">{type}</h3>
                <p className="text-gray-400">{location}</p>
            </div>
        );
    }
};

export default StatCard;