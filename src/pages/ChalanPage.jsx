import { useState, useEffect } from "react";
import { Search, Send, Users, MapPin, Mail, Check, X } from "lucide-react";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_Backend_URL || "http://localhost:3000";

const ChalanPage = () => {
    console.log("ChalanPage rendering");
    
    const [joinRequests, setJoinRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [broadcastMessage, setBroadcastMessage] = useState("");
    const [broadcastArea, setBroadcastArea] = useState("");
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [activeTab, setActiveTab] = useState("pending");
    const [stats, setStats] = useState({
        totalRequests: 0,
        pendingRequests: 0,
        approvedRequests: 0,
        rejectedRequests: 0
    });

    // API base URL - can be moved to environment variable
    const API_BASE_URL = `${backendUrl}/api`;

    useEffect(() => {
        console.log("ChalanPage mounted");
        fetchJoinRequests();
        fetchRequestStats();
        
        return () => {
            console.log("ChalanPage unmounted");
        };
    }, []);

    const fetchJoinRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/queries`, {
                params: {
                    query_type: "Join Request",
                    limit: 100
                }
            });
            console.log("Join requests data:", response.data);
            setJoinRequests(response.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching join requests:", error);
            toast.error("Failed to load join requests");
            setLoading(false);
        }
    };

    const fetchRequestStats = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/queries/statistics`);
            console.log("Stats response:", response.data);
            
            // Add defensive checks for data structure
            const data = response.data || {};
            const byType = data.stats?.byType || {};
            const byStatus = data.stats?.byStatus || {};
            
            setStats({
                totalRequests: byType.joinRequest || 0,
                pendingRequests: byStatus.pending || 0,
                approvedRequests: byStatus.resolved || 0,
                rejectedRequests: byStatus.rejected || 0
            });
        } catch (error) {
            console.error("Error fetching statistics:", error);
            // Set default stats to avoid undefined values
            setStats({
                totalRequests: 0,
                pendingRequests: 0,
                approvedRequests: 0,
                rejectedRequests: 0
            });
            toast.error("Failed to load statistics");
        }
    };

    const updateRequestStatus = async (id, status, note) => {
        try {
            await axios.put(`${API_BASE_URL}/queries/${id}/status`, {
                status,
                resolution_note: note
            });
            
            toast.success(`Request ${status.toLowerCase()} successfully`);
            fetchJoinRequests();
            fetchRequestStats();
        } catch (error) {
            console.error(`Error updating request status:`, error);
            toast.error("Failed to update request status");
        }
    };

    const handleApprove = (id) => {
        updateRequestStatus(id, "Resolved", "Join request approved. Welcome to Traffic Buddy team!");
    };

    const handleReject = (id) => {
        updateRequestStatus(id, "Rejected", "Thank you for your interest. Unfortunately, we cannot accept your request at this time.");
    };

    const handleBroadcastToAll = async () => {
        if (!broadcastMessage.trim()) {
            toast.error("Please enter a message to broadcast");
            return;
        }

        try {
            setIsBroadcasting(true);
            await axios.post(`${API_BASE_URL}/queries/broadcast`, {
                message: broadcastMessage
            });
            
            toast.success("Message broadcast successfully to all users");
            setBroadcastMessage("");
        } catch (error) {
            console.error("Error broadcasting message:", error);
            toast.error("Failed to broadcast message");
        } finally {
            setIsBroadcasting(false);
        }
    };

    const handleBroadcastToArea = async () => {
        if (!broadcastMessage.trim() || !broadcastArea.trim()) {
            toast.error("Please enter both a message and an area");
            return;
        }

        try {
            setIsBroadcasting(true);
            await axios.post(`${API_BASE_URL}/queries/broadcasttoVolunteers`, {
                message: broadcastMessage,
                area: broadcastArea
            });
            
            toast.success(`Message broadcast successfully to volunteers in ${broadcastArea}`);
            setBroadcastMessage("");
            setBroadcastArea("");
        } catch (error) {
            console.error("Error broadcasting message to area:", error);
            toast.error("Failed to broadcast message to volunteers");
        } finally {
            setIsBroadcasting(false);
        }
    };

    const filteredRequests = joinRequests.filter(request => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            (request.user_name && request.user_name.toLowerCase().includes(searchLower)) ||
            (request.description && request.description.toLowerCase().includes(searchLower)) ||
            (request.email && request.email?.toLowerCase().includes(searchLower)) ||
            (request.phone && request.phone?.includes(searchTerm));
            
        // Filter by status based on active tab
        if (activeTab === "pending") return matchesSearch && request.status === "Pending";
        if (activeTab === "approved") return matchesSearch && request.status === "Resolved";
        if (activeTab === "rejected") return matchesSearch && request.status === "Rejected";
        return matchesSearch; // "all" tab
    });

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="User Management" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Stats */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StatCard
                        name="Total Join Requests"
                        icon={Users}
                        value={stats.totalRequests.toString()}
                        color="#6366F1"
                    />
                    <StatCard
                        name="Pending Approval"
                        icon={Mail}
                        value={stats.pendingRequests.toString()}
                        color="#F59E0B"
                    />
                    <StatCard
                        name="Approved Volunteers"
                        icon={Check}
                        value={stats.approvedRequests.toString()}
                        color="#10B981"
                    />
                    <StatCard
                        name="Rejected Requests"
                        icon={X}
                        value={stats.rejectedRequests.toString()}
                        color="#EF4444"
                    />
                </motion.div>

                {/* Broadcast Message Section */}
                <motion.div
                    className="mb-8 bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lg
shadow-bgPrimary rounded-xl p-6 border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl font-semibold text-tBase mb-4">Broadcast Messages</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Broadcast to all users */}
                        <div className="space-y-3">
                            <h3 className="text-lg text-tBase">Broadcast to All Users</h3>
                            <textarea
                                className="w-full bg-primary text-tBase rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="Enter message to broadcast to all users..."
                                value={broadcastMessage}
                                onChange={(e) => setBroadcastMessage(e.target.value)}
                            ></textarea>
                            <button
                                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-tBase py-2 px-4 rounded-md transition duration-200"
                                onClick={handleBroadcastToAll}
                                disabled={isBroadcasting || !broadcastMessage.trim()}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                {isBroadcasting ? "Sending..." : "Send to All Users"}
                            </button>
                        </div>

                        {/* Broadcast to specific area */}
                        <div className="space-y-3">
                            <h3 className="text-lg text-tBase">Broadcast to Volunteers by Area</h3>
                            <input
                                type="text"
                                className="w-full bg-primary text-tBase rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="Enter area name (e.g. Downtown, North Side...)"
                                value={broadcastArea}
                                onChange={(e) => setBroadcastArea(e.target.value)}
                            />
                            <textarea
                                className="w-full bg-primary text-tBase rounded-md p-3 h-24 focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="Enter message for volunteers in this area..."
                                value={broadcastMessage}
                                onChange={(e) => setBroadcastMessage(e.target.value)}
                            ></textarea>
                            <button
                                className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-tBase py-2 px-4 rounded-md transition duration-200"
                                onClick={handleBroadcastToArea}
                                disabled={isBroadcasting || !broadcastMessage.trim() || !broadcastArea.trim()}
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                {isBroadcasting ? "Sending..." : "Send to Area Volunteers"}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Join Requests Management */}
                <motion.div
                    className="bg-bgSecondary bg-opacity-50 backdrop-blur-md shadow-lg shadow-bgPrimary rounded-xl p-6 border border-borderPrimary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-tBase mb-4 md:mb-0">Join Requests</h2>
                        
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search requests..."
                                    className="pl-10 pr-4 py-2 bg-primary rounded-md border border-gray-600 text-tBase focus:outline-none focus:ring-2 focus:ring-secondary w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="w-4 h-4 absolute left-3 top-3 text-tSecondary" />
                            </div>
                            
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                {["all", "pending", "approved", "rejected"].map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 text-sm font-medium ${
                                            activeTab === tab
                                                ? "bg-secondary text-tBase"
                                                : "bg-primary text-tBase hover:bg-hovPrimary"
                                        } ${
                                            tab === "all" ? "rounded-l-lg" : ""
                                        } ${
                                            tab === "rejected" ? "rounded-r-lg" : ""
                                        } focus:z-10 focus:ring-2 focus:outline-none`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredRequests.length === 0 ? (
                        <div className="bg-bgSecondary bg-opacity-50 rounded-lg p-8 text-center">
                            <p className="text-tBase">No join requests found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-primary text-left text-xs font-medium text-tBase uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 bg-primary text-left text-xs font-medium text-tBase uppercase tracking-wider">Details</th>
                                        <th className="px-6 py-3 bg-primary text-left text-xs font-medium text-tBase uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 bg-primary text-left text-xs font-medium text-tBase uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 bg-primary text-right text-xs font-medium text-tBase uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-bgSecondary bg-opacity-50 divide-y divide-gray-700">
                                    {filteredRequests.map((request) => {
                                        // Extract name, email, phone from description if not available directly
                                        const descLines = request.description ? request.description.split('\n') : [];
                                        const extractInfo = (prefix) => {
                                            const line = descLines.find(l => l.toLowerCase().includes(prefix.toLowerCase()));
                                            return line ? line.split(':')[1]?.trim() : '';
                                        };

                                        const name = request.name || extractInfo('name') || request.user_name || 'Unknown';
                                        const email = request.email || extractInfo('email') || 'N/A';
                                        const phone = request.phone || extractInfo('phone') || 
                                            (request.user_id ? request.user_id.replace('whatsapp:', '') : 'N/A');
                                        
                                        return (
                                            <tr key={request._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                                                            <span className="text-tBase font-medium">{name.charAt(0).toUpperCase()}</span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-tBase">{name}</div>
                                                            <div className="text-sm text-tSecondary">{phone}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-tBase">{email}</div>
                                                    <div className="text-sm text-tSecondary max-w-xs truncate">
                                                        {request.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${request.status === 'Pending' ? 'bg-yellow-800 text-yellow-100' : 
                                                        request.status === 'Resolved' ? 'bg-green-800 text-green-100' : 
                                                        'bg-red-800 text-red-100'}`}>
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-tSecondary">
                                                    {new Date(request.timestamp).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {request.status === 'Pending' ? (
                                                        <div className="flex justify-end space-x-2">
                                                            <button
                                                                onClick={() => handleApprove(request._id)}
                                                                className="text-green-500 hover:text-green-400 bg-primary rounded-md p-2 transition"
                                                                title="Approve"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(request._id)}
                                                                className="text-red-500 hover:text-red-400 bg-primary rounded-md p-2 transition"
                                                                title="Reject"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-500 italic">
                                                            {request.status === 'Resolved' ? 'Approved' : 'Rejected'}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
};

export default ChalanPage;