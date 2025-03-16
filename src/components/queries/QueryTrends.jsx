import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

const QueryTrends = () => {
    const [trendData, setTrendData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/queries/statistics');
                if (response.data.success && response.data.stats.recent.dailyCounts) {
                    // Format data for the chart
                    const formattedData = response.data.stats.recent.dailyCounts.map(item => ({
                        date: item._id,
                        queries: item.count
                    }));
                    setTrendData(formattedData);
                }
            } catch (error) {
                console.error("Error fetching trend data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>Query Trends (Last 30 Days)</h2>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className='h-[320px]'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                            <XAxis dataKey='date' stroke='#9CA3AF' />
                            <YAxis stroke='#9CA3AF' />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                                    borderColor: "#4B5563",
                                }}
                                itemStyle={{ color: "#E5E7EB" }}
                            />
                            <Legend />
                            <Line
                                type='monotone'
                                dataKey='queries'
                                stroke='#8B5CF6'
                                strokeWidth={2}
                                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 8 }}
                                name="Number of Queries"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    );
};

export default QueryTrends;