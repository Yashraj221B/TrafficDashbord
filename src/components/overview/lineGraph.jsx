import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Themes, { getCurrentTheme } from "../../assets/Themes";

const LineGraph = ({ data = [], name = "Reports" }) => {
  return (
    <motion.div
      className="bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lg
shadow-bgPrimary rounded-xl p-6 border border-borderPrimary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-tBase">{name}</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={Themes[getCurrentTheme()]["cartGrid"]} />
            <XAxis dataKey={"name"} stroke={Themes[getCurrentTheme()]["cartAxis"]} />
            <YAxis stroke={Themes[getCurrentTheme()]["cartAxis"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: Themes[getCurrentTheme()]["bgPrimary"],
                opacity: "80%",
                borderColor: Themes[getCurrentTheme()]["borderPrimary"],
              }}
              itemStyle={{
                color: Themes[getCurrentTheme()]["tBase"],
                opacity: "100%",
              }}
            />
            <Line
              type="monotone"
              dataKey="reports"
              stroke={Themes[getCurrentTheme()]["cartLine"]}
              strokeWidth={3}
              dot={{ fill: Themes[getCurrentTheme()]["cartLine"], strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default LineGraph;
