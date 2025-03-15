import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = ({
  categoryData,
  innerRadius = 60,
  outerRadius = 80,
  height = 320,
  name = "Pie Chart",
}) => {
  const getLargestValue = () => {
    return categoryData.reduce(
      (max, item) => (item.value > max.value ? item : max),
      categoryData[0]
    );
  };
  const getTotalValue = () => {
    return categoryData.reduce((total, item) => total + item.value, 0);
  };

  const getLargestValuePercentage = () => {
    const largestValue = getLargestValue().value;
    const totalValue = getTotalValue();
    return ((largestValue / totalValue) * 100).toFixed(2);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-100">{name}</h2>
      </div>
      <div className="flex" style={{ height }}>
        <div className="w-2/5">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
            <text
                x={"50%"}
                y={"50%"}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize={14}
              >
                {Math.round(getLargestValuePercentage())}%
            </text>
              <Pie
                data={categoryData}
                cx={"50%"}
                cy={"50%"}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill="#2884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-4/5 flex flex-col justify-center items-start pl-6">
        <div className="space-y-3">
            {categoryData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-200 text-sm">{item.name}</span>
                </div>
            ))}
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;