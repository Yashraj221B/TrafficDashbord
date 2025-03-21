import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/common/Header";
import LineGraph from "../components/overview/lineGraph";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import InfractionByDivisionChart from "../components/overview/InfractionByDivisionChart";
import TwoValueRadialChart from "../components/overview/TwoValueRadialChart";

const DivisionWisePerformance = () => {
  const backendUrl =
    import.meta.env.VITE_Backend_URL || "http://localhost:3000";

  const [dashboardData, setDashboardData] = useState({
    queriesPerDay: [],
    queryTypes: [],
    queryStatus: { pending: 0, inProgress: 0, resolved: 0, rejected: 0 },
    totalQueries: 0,
    userCount: 0,
    activeSessions: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //seconds it takes to load a graphic
  const transitionDuration = 1;
  //seconds delay between each graphic
  const transitionDelay = 0.2;

  // Tldr; fetch and setState(DashboardData)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [summaryRes, activityRes] = await Promise.all([
          axios.get(`${backendUrl}/api/dashboard/summary`),
          axios.get(`${backendUrl}/api/dashboard/recent-activity`),
        ]);

        setDashboardData(summaryRes.data.data);
        setRecentActivity(activityRes.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [backendUrl]);

  // Transform query types data for pie chart
  const queryTypesData = dashboardData.queryTypes.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  // Transform query status data for radial charts
  const pendingQueriesData = [
    { name: "Pending", value: dashboardData.queryStatus.pending },
    {
      name: "Total",
      value: dashboardData.totalQueries - dashboardData.queryStatus.pending,
    },
  ];

  const inProgressQueriesData = [
    { name: "In Progress", value: dashboardData.queryStatus.inProgress },
    {
      name: "Total",
      value: dashboardData.totalQueries - dashboardData.queryStatus.inProgress,
    },
  ];

  const resolvedQueriesData = [
    { name: "Resolved", value: dashboardData.queryStatus.resolved },
    {
      name: "Total",
      value: dashboardData.totalQueries - dashboardData.queryStatus.resolved,
    },
  ];

  const activeUsersData = [
    { name: "Active Sessions", value: dashboardData.activeSessions },
    {
      name: "Total Users",
      value: dashboardData.userCount - dashboardData.activeSessions,
    },
  ];

  // Transform queries per day for line chart
  const queriesPerDayData =
    dashboardData.queriesPerDay?.map((item) => ({
      name: new Date(item._id).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      reports: item.count,
    })) || [];

  // Varibles for the top 4 pie charts
  const _innerRadius = 20;
  const _outerRadius = 35;

  // Show Loading text till the data loads
  if (loading) {
    return (
      <div className="flex-1 overflow-auto relative z-10 flex items-center justify-center">
        <div className="text-tBase text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  // Show error text
  if (error) {
    return (
      <div className="flex-1 overflow-auto relative z-10 flex items-center justify-center">
        <div className="bg-red-800 bg-opacity-50 backdrop-blur-md p-5 rounded-lg text-tBase">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Division Wise Performance" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Total queries count */}
        <motion.div
          className="bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lg shadow-bgPrimary rounded-xl p-6 border border-borderPrimary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration, delay: transitionDelay }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-tBase">
              Total Traffic Reports
            </h2>
            <div className="text-3xl font-bold text-tTrafficReports">
              {dashboardData.totalQueries}
            </div>
          </div>
        </motion.div>

        {/* Reports Per Day and Category Charts */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: transitionDuration,
            delay: transitionDelay * 2,
          }}
        >
          <InfractionByDivisionChart showPercentage={false}/>
          <InfractionByDivisionChart showPercentage={true}/>
        </motion.div>

        {/* Recent Activity Graph */}
        <motion.div
          className="bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lgshadow-bgPrimary rounded-xl p-6 border border-borderPrimary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: transitionDuration,
            delay: transitionDelay * 3,
          }}
        >
          <h2 className="text-lg font-medium mb-4 text-tBase">
            Recent Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-seperationPrimary">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-tBase uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-tBase uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-tBase uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-tBase uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-tBase uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-seperationPrimary">
                {recentActivity.slice(0, 5).map((activity, idx) => {
                  // Safely extract location address with fallback values
                  const locationAddress = activity.location?.address
                    ? activity.location.address.split(",").slice(0, 2).join(",")
                    : "Location not available";

                  return (
                    <tr
                      key={activity._id}
                      className={
                        idx % 2 === 0
                          ? "bg-bgSecondary bg-opacity-40"
                          : "bg-bgSecondary bg-opacity-20"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                        {activity.query_type || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-200">
                        {activity.description || "No description"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {locationAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            activity.status === "Pending"
                              ? "bg-yellow-800 text-yellow-100"
                              : activity.status === "In Progress"
                              ? "bg-blue-800 text-blue-100"
                              : "bg-green-800 text-green-100"
                          }`}
                        >
                          {activity.status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {activity.timestamp
                          ? new Date(activity.timestamp).toLocaleString()
                          : "Unknown time"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DivisionWisePerformance;
