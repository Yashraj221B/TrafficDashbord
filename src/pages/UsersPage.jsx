import { useState, useEffect } from "react";
import { AlertTriangle, Check, Clock, FileSearch, Mail, MapPin, Search, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import QueryStatusChart from "../components/queries/QueryStatusChart";
import QueryTypeDistribution from "../components/queries/QueryTypeDistribution";
import QueryTrends from "../components/queries/QueryTrends";

const QueryManagementPage = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [timelineActive, setTimelineActive] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [selectedQueryForEmail, setSelectedQueryForEmail] = useState(null);
    const [departmentEmail, setDepartmentEmail] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [emailSending, setEmailSending] = useState(false);
    const [queryStats, setQueryStats] = useState({
        byStatus: {
            pending: 0,
            inProgress: 0,
            resolved: 0,
            rejected: 0
        },
        byType: {
            trafficViolation: 0,
            trafficCongestion: 0,
            accident: 0,
            roadDamage: 0,
            illegalParking: 0,
            suggestion: 0,
            generalReport: 0
        },
        total: 0
    });
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [viewDetailsId, setViewDetailsId] = useState(null);
    const [detailsData, setDetailsData] = useState(null);

    useEffect(() => {
        fetchQueryStats();
		if (!timelineActive) {
			fetchQueries();
		}
	}, [currentPage, searchTerm, selectedType, selectedStatus, timelineActive]);

    const fetchQueryStats = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/queries/statistics');
            if (response.data.success) {
                setQueryStats(response.data.stats);
            }
        } catch (error) {
            console.error("Error fetching query statistics:", error);
        }
    };

    const fetchQueries = async () => {
        setLoading(true);
        try {
            let url = `http://localhost:3000/api/queries?page=${currentPage}&limit=20`;
            
            if (searchTerm) {
                url += `&search=${searchTerm}`;
            }
            
            if (selectedType && selectedType !== "all") {
                url += `&query_type=${selectedType}`;
            }
            
            if (selectedStatus && selectedStatus !== "all") {
                url += `&status=${selectedStatus}`;
            }
            
            const response = await axios.get(url);
            
            if (response.data.success) {
                setQueries(response.data.data);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.currentPage);
            }
        } catch (error) {
            console.error("Error fetching queries:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchQueryDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/queries/${id}`);
            if (response.data.success) {
                setDetailsData(response.data.data);
                setViewDetailsId(id);
            }
        } catch (error) {
            console.error("Error fetching query details:", error);
        }
    };

    const updateQueryStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:3000/api/queries/${id}/status`, {
                status: newStatus
            });
            
            // Refresh queries and stats
            fetchQueries();
            fetchQueryStats();
            
            // If the details modal is open for this query, refresh details too
            if (viewDetailsId === id) {
                fetchQueryDetails(id);
            }
        } catch (error) {
            console.error("Error updating query status:", error);
        }
    };

    const handleSendEmail = async () => {
        if (!departmentEmail || !departmentName) {
            alert("Please enter both department email and name");
            return;
        }
        
        console.log("Sending email for query:", selectedQueryForEmail);
        setEmailSending(true);
        
        try {
            // Make sure we have the correct ID format
            const queryId = selectedQueryForEmail._id || selectedQueryForEmail.id;
            
            console.log(`Making request to: http://localhost:3000/api/queries/${queryId}/notify-department`);
            
            const response = await axios.post(
                `http://localhost:3000/api/queries/${queryId}/notify-department`,
                {
                    email: departmentEmail,
                    departmentName: departmentName
                }
            );
            
            console.log("Response:", response.data);
            
            if (response.data.success) {
                alert(`Email successfully sent to ${departmentName}`);
                setEmailModalOpen(false);
                setDepartmentEmail("");
                setDepartmentName("");
                setSelectedQueryForEmail(null);
            }
        } catch (error) {
            console.error("Error sending email:", error);
            
            let errorMessage = "Failed to send email. Please try again.";
            
            if (error.response) {
                // Server responded with error
                errorMessage = `Error: ${error.response.data.message || error.response.statusText}`;
                console.log("Server error details:", error.response.data);
            } else if (error.request) {
                // Request made but no response
                errorMessage = "Server did not respond. Check your connection.";
            }
            
            alert(errorMessage);
        } finally {
            setEmailSending(false);
        }
    };
    

    const openInGoogleMaps = (latitude, longitude) => {
        window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
    };

	const applyTimelineFilter = async () => {
		if (!startDate || !endDate) {
			alert("Please select both start and end dates");
			return;
		}
		
		setLoading(true);
		setTimelineActive(true);
		
		try {
			const response = await axios.get(
				`http://localhost:3000/api/queries/timeline?start=${startDate}T00:00:00.000Z&end=${endDate}T23:59:59.999Z`
			);
			
			if (response.data.success) {
				setQueries(response.data.data);
				setTotalPages(Math.ceil(response.data.count / 20)); // Assuming 20 per page
				setCurrentPage(1);
			}
		} catch (error) {
			console.error("Error fetching timeline queries:", error);
		} finally {
			setLoading(false);
		}
	};
	
	const clearTimelineFilter = () => {
		setStartDate("");
		setEndDate("");
		setTimelineActive(false);
		fetchQueries(); // Go back to regular query fetching
	};

    const sendEmail = (query) => {
        console.log("Query being sent:", query); // Add this line
        setSelectedQueryForEmail(query);
        setEmailModalOpen(true);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleStatusFilter = (e) => {
        setSelectedStatus(e.target.value);
        setCurrentPage(1);
    };

    const handleTypeFilter = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const getBadgeColor = (status) => {
        switch (status) {
            case "Pending": return "bg-yellow-700 text-yellow-100";
            case "In Progress": return "bg-blue-700 text-blue-100";
            case "Resolved": return "bg-green-700 text-green-100";
            case "Rejected": return "bg-red-700 text-red-100";
            default: return "bg-gray-700 text-gray-100";
        }
    };

    const closeDetails = () => {
        setViewDetailsId(null);
        setDetailsData(null);
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Query Management' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StatCard
                        name='Total Queries'
                        icon={FileSearch}
                        value={queryStats.total.toLocaleString()}
                        color='#6366F1'
                    />
                    <StatCard 
                        name='Pending Queries' 
                        icon={Clock} 
                        value={queryStats.byStatus?.pending || 0} 
                        color='#F59E0B' 
                    />
                    <StatCard
                        name='In Progress'
                        icon={AlertTriangle}
                        value={queryStats.byStatus?.inProgress || 0}
                        color='#3B82F6'
                    />
                    <StatCard 
                        name='Resolved' 
                        icon={Check} 
                        value={queryStats.byStatus?.resolved || 0} 
                        color='#10B981' 
                    />
                </motion.div>

                {/* FILTERS */}
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="relative flex-1 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search queries..."
                                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                        
                        <div className="flex flex-wrap gap-3 w-full md:w-auto">
                            <select
                                value={selectedType}
                                onChange={handleTypeFilter}
                                className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Types</option>
                                <option value="Traffic Violation">Traffic Violation</option>
                                <option value="Traffic Congestion">Traffic Congestion</option>
                                <option value="Accident">Accident</option>
                                <option value="Road Damage">Road Damage</option>
                                <option value="Illegal Parking">Illegal Parking</option>
                                <option value="Suggestion">Suggestion</option>
                                <option value="General Report">General Report</option>
                            </select>
                            
                            <select
                                value={selectedStatus}
                                onChange={handleStatusFilter}
                                className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
						{/* Add this inside the filter section div */}
						<div className="flex items-center gap-3 w-full md:w-auto mt-3 md:mt-0">
							<div className="flex items-center">
								<Calendar size={18} className="text-gray-400 mr-2" />
								<span className="text-gray-300 mr-2">From:</span>
								<input
									type="date"
									className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									onChange={(e) => setStartDate(e.target.value)}
									value={startDate}
								/>
							</div>
							<div className="flex items-center">
								<span className="text-gray-300 mr-2">To:</span>
								<input
									type="date"
									className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									onChange={(e) => setEndDate(e.target.value)}
									value={endDate}
								/>
							</div>
							<button 
								className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
								onClick={applyTimelineFilter}
							>
								Apply
							</button>
							{timelineActive && (
								<button 
									className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg"
									onClick={clearTimelineFilter}
								>
									Clear
								</button>
							)}
						</div>
                    </div>
                </motion.div>

                {/* QUERY TABLE */}
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 overflow-x-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl font-semibold text-gray-100 mb-4">Queries</h2>
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {queries.map((query) => (
                                        <motion.tr
                                            key={query._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                                                    {query.query_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-300 max-w-xs truncate">
                                                    {query.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8">
                                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                            {query.user_name?.charAt(0) || "U"}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-100">{query.user_name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(query.status)}`}>
                                                    {query.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {formatDate(query.timestamp)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <button 
                                                        className="text-blue-400 hover:text-blue-300"
                                                        onClick={() => fetchQueryDetails(query._id)}
                                                    >
                                                        Details
                                                    </button>
                                                    
                                                    <button
                                                        className="text-green-400 hover:text-green-300"
                                                        onClick={() => openInGoogleMaps(query.location.latitude, query.location.longitude)}
                                                    >
                                                        <MapPin size={16} />
                                                    </button>
                                                    
                                                    <button 
														className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
														onClick={() => sendEmail(query)}
													>
														Forward to Department
													</button>
                                                </div>
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
                                        onClick={() => setCurrentPage(c => Math.max(c - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    >
                                        Previous
                                    </button>
                                    <button 
                                        onClick={() => setCurrentPage(c => c < totalPages ? c + 1 : c)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
                
                {/* QUERY CHARTS */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
                    <QueryStatusChart stats={queryStats.byStatus} />
                    <QueryTypeDistribution stats={queryStats.byType} />
                    <QueryTrends className="lg:col-span-2" />
                </div>
                
				{/* Query Details Modal */}
								{viewDetailsId && detailsData && (
									<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
										<motion.div 
											className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
										>
											<div className="flex justify-between items-start">
												<h2 className="text-xl font-semibold text-gray-100">{detailsData.query_type} Report</h2>
												<button 
													className="text-gray-400 hover:text-white"
													onClick={closeDetails}
												>
                                                    Close
												</button>
											</div>
											
											<div className="mt-4 space-y-4">
												{detailsData.photo_url && (
													<div>
														<h3 className="text-sm font-medium text-gray-400 mb-2">Photo Evidence:</h3>
														<div className="flex justify-center">
															<img 
																src={detailsData.photo_url} 
																alt="Report evidence" 
																className="rounded-lg object-contain max-w-full" 
																style={{ maxHeight: "400px" }}
															/>
														</div>
													</div>
												)}
												
												<div>
													<h3 className="text-sm font-medium text-gray-400">Description:</h3>
													<p className="text-gray-200">{detailsData.description}</p>
												</div>
												
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div>
														<h3 className="text-sm font-medium text-gray-400">Reported By:</h3>
														<p className="text-gray-200">{detailsData.user_name}</p>
													</div>
													
													<div>
														<h3 className="text-sm font-medium text-gray-400">Reporter Contact:</h3>
														<p className="text-gray-200">{detailsData.user_id.replace('whatsapp:', '')}</p>
													</div>
													
													<div>
														<h3 className="text-sm font-medium text-gray-400">Reported On:</h3>
														<p className="text-gray-200">{formatDate(detailsData.timestamp)}</p>
													</div>
													
													<div>
														<h3 className="text-sm font-medium text-gray-400">Current Status:</h3>
														<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(detailsData.status)}`}>
															{detailsData.status}
														</span>
													</div>
												</div>
												
												<div>
													<h3 className="text-sm font-medium text-gray-400">Location Address:</h3>
													<p className="text-gray-200">{detailsData.location.address}</p>
													<button 
														className="mt-2 flex items-center text-blue-400 hover:text-blue-300"
														onClick={() => openInGoogleMaps(detailsData.location.latitude, detailsData.location.longitude)}
													>
														<MapPin size={16} className="mr-1" /> View on Google Maps
													</button>
												</div>
												
												{detailsData.resolution_note && (
													<div>
														<h3 className="text-sm font-medium text-gray-400">Resolution Notes:</h3>
														<p className="text-gray-200">{detailsData.resolution_note}</p>
														{detailsData.resolved_at && (
															<p className="text-sm text-gray-400 mt-1">Resolved on: {formatDate(detailsData.resolved_at)}</p>
														)}
													</div>
												)}
												
												{/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <button 
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => updateQueryStatus(detailsData._id, "Resolved")}
                                        disabled={detailsData.status === "Resolved"}
                                    >
                                        Mark as Resolved
                                    </button>
                                    
                                    <button 
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => updateQueryStatus(detailsData._id, "In Progress")}
                                        disabled={detailsData.status === "In Progress"}
                                    >
                                        Mark as In Progress
                                    </button>
                                    
                                    <button 
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => updateQueryStatus(detailsData._id, "Pending")}
                                        disabled={detailsData.status === "Pending"}
                                    >
                                        Mark as Pending
                                    </button>
                                    
                                    <button 
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                                        onClick={() => sendEmail(detailsData)}
                                    >
                                        Forward to Department
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
				{/* Email Department Modal */}
					{emailModalOpen && selectedQueryForEmail && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
							<motion.div 
								className="bg-gray-800 rounded-xl p-6 max-w-md w-full"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
							>
								<div className="flex justify-between items-start">
									<h2 className="text-xl font-semibold text-gray-100">Forward to Department</h2>
									<button 
										className="text-gray-400 hover:text-white"
										onClick={() => setEmailModalOpen(false)}
									>
										
									</button>
								</div>
								
								<div className="mt-6">
									<div className="mb-4">
										<h3 className="text-sm font-medium text-gray-400 mb-1">Query Type:</h3>
										<p className="text-gray-200">{selectedQueryForEmail.query_type}</p>
									</div>
									
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-400 mb-1">Department Name:</label>
										<input
											type="text"
											className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="e.g. Traffic Police Department"
											value={departmentName}
											onChange={(e) => setDepartmentName(e.target.value)}
										/>
									</div>
									
									<div className="mb-6">
										<label className="block text-sm font-medium text-gray-400 mb-1">Department Email:</label>
										<input
											type="email"
											className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="department@example.com"
											value={departmentEmail}
											onChange={(e) => setDepartmentEmail(e.target.value)}
										/>
									</div>
									
									<div className="flex justify-end space-x-3">
										<button
											className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
											onClick={() => setEmailModalOpen(false)}
										>
											Cancel
										</button>
										<button
											className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
											onClick={handleSendEmail}
											disabled={emailSending}
										>
											{emailSending ? (
												<>
													<div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-2"></div>
													Sending...
												</>
											) : (
												<>
													<Mail size={16} className="mr-2" /> Send Email
												</>
											)}
										</button>
									</div>
								</div>
							</motion.div>
						</div>
					)}
            </main>
        </div>
    );
};

export default QueryManagementPage;