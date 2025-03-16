import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import MapContainer from "../components/common/MapView";
import StatCard from "../components/common/StatCard";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const Infractions = [
    { type: "Speeding", location: "Pimpri" },
    { type: "Parking Violation", location: "Chinchwad" },
    { type: "Signal Jumping", location: "Nigdi" },
    // Add more infractions as needed
];

const AnalyticsPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
            <div className="flex items-center justify-between space-x-4 p-4">
                <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex space-x-4">
                        <DateTimePicker
                            label="From"
                            sx={{
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                            }}
                        />
                        <DateTimePicker
                            label="To"
                            sx={{
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                            }}
                        />
                    </div>
                </LocalizationProvider>
            </div>

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div className="grid grid-cols-4 gap-5 mb-8">
                    {/* Left Section */}
                    <div className="col-span-1 space-y-5">
                        <div className="bg-blue-500 h-64 rounded-lg shadow-md"></div>
                        <div className="bg-green-500 h-64 rounded-lg shadow-md"></div>
                    </div>

                    {/* Middle Section */}
                    <div className="col-span-2 space-y-5">
                        <MapContainer />
                    </div>

                    {/* Right Section */}
                    <div className="col-span-1 space-y-5">
                        {Infractions.map((infraction, index) => (
                            <StatCard key={index} type={infraction.type} location={infraction.location} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnalyticsPage;