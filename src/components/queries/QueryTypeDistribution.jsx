import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

const COLORS = [
    "#6366F1", "#10B981", "#F59E0B", "#EF4444", 
    "#3B82F6", "#8B5CF6", "#EC4899"
];

const QueryTypeDistribution = ({ stats }) => {
    // Transform stats object into array format for Recharts
    const data = [
        { name: "Traffic Violation", value: stats?.trafficViolation || 0 },
        { name: "Traffic Congestion", value: stats?.trafficCongestion || 0 },
        { name: "Accident", value: stats?.accident || 0 },
        { name: "Road Damage", value: stats?.roadDamage || 0 },
        { name: "Illegal Parking", value: stats?.illegalParking || 0 },
        { name: "Suggestion", value: stats?.suggestion || 0 },
        { name: "General Report", value: stats?.generalReport || 0 },
    ];

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg
shadow-bgPrimary rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>Query Type Distribution</h2>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9CA3AF" />
                        <YAxis 
                            type="category" 
                            dataKey="name" 
                            stroke="#9CA3AF" 
                            tick={{ fontSize: 12 }}
                            width={95}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Bar dataKey="value" fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default QueryTypeDistribution;