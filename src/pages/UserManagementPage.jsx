import { useState, useEffect } from "react";
import { Search, Send, Users, MapPin, Mail, Check, X } from "lucide-react";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import UserEdit from "../components/userManagement/userEdit";

const queries = [
  {
    user_name: "Videsh Gupta",
    status: "On Duty",
    region: "DIGHI-ALANDI",
    post: "Sub inspector",
  },
  {
    user_name: "Pranali Sinha",
    status: "Off Duty",
    region: "CHAKAN",
    post: "Sub inspector",
  },
  {
    user_name: "Mahesh Roy",
    status: "On Duty",
    region: "PIMPRI",
    post: "traffic havaldar",
  },
];

const UserManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  //YASHRAJ: Make sure to set total pages user AdminQueryMagagemetnPage for reference
  const [totalPages, setTotalPages] = useState(1);

  const [viewDetailsId, setViewDetailsId] = useState(null);
  const [detailsData, setDetailsData] = useState(null);

  const [viewEditUserId, setViewEditUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  const [viewChangeUser, setViewChangeUser] = useState(false);

  console.log("ChalanPage rendering");

  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastArea, setBroadcastArea] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // API base URL - can be moved to environment variable
  const API_BASE_URL = "http://localhost:3000/api";

  useEffect(() => {
    console.log("UserManagementPage mounted");
    setLoading(false);
    return () => {
      console.log("UserManagementPage unmounted");
    };
  }, []);

  const fetchQueryDetails = async () => {
    setDetailsData({
      user_name: "Videsh Mahesh Gupta",
      status: "On Duty",
      region: "PIMPRI",
      post: "traffic havaldar",
      user_id: "09876543",
      subregion: "SMTH",
    });
    setViewDetailsId("2");
  };

  const fetchUserDetails = async () => {
    setUserData({
        name:"Videsh Mahesh Gupta",
        phone:["+91-786541235","+91-1652189876"],
        email:"subInspector@dighiAlandi.com",
        post:"Sub Inspector",
        division:"DIGHI-ALANDI",
    });
    setViewEditUserId("2");
  };

  const showChangeUserPopUp = async () => {
    setViewChangeUser(true);
  };
  const closeChangeUserPopUp = async () => {
    setViewChangeUser(false);
  };
  const applyUserChanges = async () =>{
    await closeChangeUserPopUp();
  }
  const closeDetails = () => {
    setViewDetailsId(null);
    setDetailsData(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="User Management" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Officer Management */}
        {/* QUERY TABLE */}
        <motion.div
          className="bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lg shadow-bgPrimary rounded-xl p-6 border border-borderPrimary mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-row items-center justify-between ">
            <h2 className="text-xl font-semibold text-tBase">Officers</h2>
            <button
              className="w-40 bg-secondary hover:bg-hovSecondary text-tBase py-2 px-4 rounded-md transition duration-200"
              onClick={showChangeUserPopUp}
            >
              {isBroadcasting ? "Sending..." : "Change User"}
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-seperationPrimary">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Officer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Post
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-seperationSecondary">
                  {queries.map((query) => (
                    <motion.tr
                      key={query._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-tBase font-semibold">
                              {query.user_name?.charAt(0) || "U"}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-tBase">
                              {query.user_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                          {query.region}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 max-w-xs truncate">
                          {query.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 max-w-xs truncate">
                          {query.post}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {/* <button
                            className="text-blue-400 hover:text-blue-300"
                            // YASHRAJ: Hardcoded function for now
                            onClick={() => fetchQueryDetails()}
                          >
                            Details
                          </button> */}
                          <button
                            className="text-blue-400 hover:text-blue-300"
                            // YASHRAJ: Hardcoded function for now
                            onClick={() => fetchUserDetails()}
                          >
                            Edit User
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                          {query.divisionName}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-400">
                  Showing page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === 1
                        ? "bg-bgSecondary text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-tBase hover:bg-blue-700"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((c) => (c < totalPages ? c + 1 : c))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === totalPages
                        ? "bg-bgSecondary text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-tBase hover:bg-blue-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </main>

      {/* Query Details Modal */}
      {/* TODO: NOT DECIDED WHAT SHOULD BE IN REGION DETAILS YET */}
      {viewDetailsId && detailsData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-bgSecondary rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-tBase">
                Region Details
              </h2>
              <button
                className="text-gray-400 hover:text-tBase"
                onClick={closeDetails}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-4xl text-tBase font-semibold">
                  {detailsData.user_name?.charAt(0) || "U"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Officer Name
                </label>
                <input
                  type="text"
                  value={detailsData.user_name}
                  className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              {/* Sub Region Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Sub Region
                </label>
                <input
                  type="text"
                  value={detailsData.subregion}
                  className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              {/* Police officer post */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Post
                </label>
                <input
                  type="text"
                  value={detailsData.post}
                  className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              {/* Region Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Region
                </label>
                <select
                  value={detailsData.region}
                  className="w-full bg-primary text-tBase rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {/* YASHRAJ: Add them programatically if you can */}
                  <option value="DIGHI-ALANDI">DIGHI-ALANDI</option>
                  <option value="CHAKAN">CHAKAN</option>
                  <option value="PIMPRI">PIMPRI</option>
                </select>
              </div>

              {/* Duty Status Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Duty Status
                </label>
                <button
                  className={`relative inline-flex items-center h-8 rounded-full w-14 transition-colors ${
                    detailsData.status === "On Duty"
                      ? "bg-green-600"
                      : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      detailsData.status === "On Duty"
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="ml-2 text-tBase">{detailsData.status}</span>
              </div>

              {/* Save Button */}
              <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-tBase py-2 px-4 rounded-md transition duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}


      {/* Edit User Modal */}
      {viewEditUserId && userData &&(
        // YASHRAJ: Fetch and set officerObject
        <UserEdit applyChangesFunc={applyUserChanges} closeFunc={closeChangeUserPopUp} officerObject={userData}/>
      )}

      {/* Add User Modal */}
      {viewChangeUser && (
        <UserEdit applyChangesFunc={applyUserChanges} closeFunc={closeChangeUserPopUp} />
      )}
    </div>
  );
};

export default UserManagementPage;
