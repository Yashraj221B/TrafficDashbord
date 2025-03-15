import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = ({
  categoryData,
  innerRadius = 60,
  outerRadius = 80,
  height = 320,
  name = "Pie Chart",
}) => {
  const [showAllLabels, setShowAllLabels] = useState(true);

  const getLargestValue = () => {
    return categoryData.reduce(
      (max, item) => (item.value > max.value ? item : max),
      categoryData[0]
    );
  };

  const renderLabel = ({ name, percent }) => {
    if (showAllLabels) {
      return `${(percent * 100).toFixed(0)}%`;
    }
    return null;
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
        <button
          onClick={() => setShowAllLabels(!showAllLabels)}
          className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md text-gray-100"
        >
          {showAllLabels ? "Hide Labels" : "Show Labels"}
        </button>
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart >
            <Pie
              data={categoryData}
              cx={"50%"}
              cy={"50%"}
              labelLine={showAllLabels}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="#2884d8"
              dataKey="value"
              label={renderLabel}
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
            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
