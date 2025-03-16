import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const generateRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Infractions_data = [
  { name: "Pimpri", value: generateRandomValue(750, 1870) },
  { name: "Chinchwad", value: generateRandomValue(750, 1870) },
  { name: "Nigdi", value: generateRandomValue(750, 1870) },
  { name: "Bhosari", value: generateRandomValue(750, 1870) },
  { name: "Hinjewadi", value: generateRandomValue(750, 1870) },
  { name: "Pimple Saudagar", value: generateRandomValue(750, 1870) },
  { name: "Ravet", value: generateRandomValue(750, 1870) },
  { name: "Talegaon", value: generateRandomValue(750, 1870) },
  { name: "Wakad", value: generateRandomValue(750, 1870) },
  { name: "Rahatani", value: generateRandomValue(750, 1870) },
  { name: "Dehu Road", value: generateRandomValue(750, 1870) },
  { name: "Sinhagad Road", value: generateRandomValue(750, 1870) },
  { name: "Balewadi", value: generateRandomValue(750, 1870) },
  { name: "Undri", value: generateRandomValue(750, 1870) },
];

const truncateLabel = (label) => {
  return label.length > 10 ? `${label.substring(0, 10)}...` : label;
};

const InfractionByDivisionChart = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>Infractions by division</h2>

      <div className='h-80'>
        <ResponsiveContainer>
          <BarChart data={Infractions_data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis
              dataKey='name'
              stroke='#9CA3AF'
              fontSize={12}
              tickFormatter={truncateLabel}
            />
            <YAxis stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend fontSize={12} />
            <Bar dataKey={"value"} fill='#8884d8'>
              {Infractions_data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default InfractionByDivisionChart;