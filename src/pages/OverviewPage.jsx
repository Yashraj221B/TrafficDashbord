import { motion } from "framer-motion";

import Header from "../components/common/Header";
import LineGraph from "../components/overview/lineGraph";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import TwoValueRadialChart from "../components/overview/TwoValueRadialChart";

const Infractions = [
  { name: "Congestions", value: 4500 },
  { name: "Broken traffic lights", value: 3200 },
  { name: "Potholes", value: 2800 },
  { name: "Imporper Number Plates", value: 2100 },
  { name: "Parking Violations", value: 1900 },
];

const trafficCongested = [
  { name: "Congested Road", value: 82 },
  { name: "Non Congested Road", value: 108 },
];

const EChalan = [
  { name: "Paid", value: 20 },
  { name: "Pending", value: 14 },
];

const Potholes = [
  { name: "Pending", value: 20 },
  { name: "Reported", value: 128 },
];

const ParkingVaiolations = [
  { name: "Pending", value: 6 },
  { name: "Issued", value: 24 },
];

const _innerRadius = 20;
const _outerRadius = 35;
const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <TwoValueRadialChart
            name={"Congestion"}
            categoryData={trafficCongested}
            innerRadius={_innerRadius}
            outerRadius={_outerRadius}
            height={100}
          />
          <TwoValueRadialChart
            name={"E-Chalan"}
            categoryData={EChalan}
            innerRadius={_innerRadius}
            outerRadius={_outerRadius}
            height={100}
          />
          <TwoValueRadialChart
            name={"Potholes"}
            categoryData={Potholes}
            innerRadius={_innerRadius}
            outerRadius={_outerRadius}
            height={100}
          />
          <TwoValueRadialChart
            name={"Parking"}
            categoryData={ParkingVaiolations}
            innerRadius={_innerRadius}
            outerRadius={_outerRadius}
            height={100}
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LineGraph name={"Infractions"} />
          <CategoryDistributionChart
            categoryData={Infractions}
            name={"Infractions"}
          />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
