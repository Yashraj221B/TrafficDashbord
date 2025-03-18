import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444"];

const QueryStatusChart = ({ stats }) => {
    // Transform stats object into array format for Recharts
    const data = [
        { name: "Pending", value: stats?.pending || 0 },
        { name: "In Progress", value: stats?.inProgress || 0 },
        { name: "Resolved", value: stats?.resolved || 0 },
        { name: "Rejected", value: stats?.rejected || 0 },
    ];

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg
shadow-bgPrimary rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className='text-xl font-semibold text-tBase mb-4'>Query Status Distribution</h2>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => (percent * 100 > 5) ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default QueryStatusChart;