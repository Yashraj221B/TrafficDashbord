import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import Themes, { getCurrentTheme } from "../../assets/Themes";

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
      className='bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lg shadow-bgPrimary rounded-xl p-6 lg:col-span-2 border border-borderPrimary'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className='text-lg font-medium mb-4 text-tBase'>Infractions by division</h2>

      <div className='h-80'>
        <ResponsiveContainer>
          <BarChart data={Infractions_data}>
            <CartesianGrid strokeDasharray='3 3' stroke={Themes[getCurrentTheme()]["cartGrid"]} />
            <XAxis
              dataKey='name'
              stroke={Themes[getCurrentTheme()]["cartAxis"]}
              fontSize={12}
              tickFormatter={truncateLabel}
            />
            <YAxis stroke={Themes[getCurrentTheme()]["cartAxis"]} />
            <Tooltip 
              cursor={{ fill: Themes[getCurrentTheme()]["primary"] }} 
                contentStyle={{
                  backgroundColor:Themes[getCurrentTheme()]["bgPrimary"],
                  opacity: "80%",
                  borderColor: Themes[getCurrentTheme()]["borderPrimary"],
                }}
                itemStyle={{
                  color: Themes[getCurrentTheme()]["tBase"],
                  opacity: "100%",
                }}
              />
            <Legend fontSize={12} />
            <Bar dataKey={"value"} fill={Themes[getCurrentTheme()]["bgSecondary"]}>
              {Infractions_data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={Themes[getCurrentTheme()]["COLORS"][index % Themes[getCurrentTheme()]["COLORS"].length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default InfractionByDivisionChart;