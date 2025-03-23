import { BarChart, XAxis, YAxis, Bar, Tooltip, CartesianGrid } from "recharts";

// Custom Horizontal Bar Chart Component for Infractions by Division
const InfractionsByDivisionChart = ({ data, name }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-borderPrimary">
        <h2 className="text-lg font-medium text-tBase mb-4">{name}</h2>
        <p className="text-tBase text-center">
          No data available for this chart.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-borderPrimary">
      <h2 className="text-lg font-medium text-tBase mb-4">{name}</h2>
      <BarChart
        width={600}
        height={data.length * 40 + 60} // Dynamic height based on number of divisions
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis type="number" stroke="#ccc" />
        <YAxis type="category" dataKey="name" stroke="#ccc" width={150} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            border: "none",
            color: "#fff",
          }}
        />
        <Bar dataKey="pending" stackId="a" fill="#ff6b6b" />
        <Bar dataKey="inProgress" stackId="a" fill="#feca57" />
        <Bar dataKey="resolved" stackId="a" fill="#54a0ff" />
        <Bar dataKey="rejected" stackId="a" fill="#a55eea" />
      </BarChart>
    </div>
  );
};

export default InfractionsByDivisionChart;
