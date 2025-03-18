import { Route, Routes } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";

import OverviewPage from "./OverviewPage";
import ProductsPage from "./ProductsPage";
import UsersPage from "./UsersPage";
import SalesPage from "./SalesPage";
import OrdersPage from "./OrdersPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";

const MainPage = () => {
        return (
            <div className='flex h-screen bg-gray-900 text-tBase overflow-hidden'>
                {/* BG */}
                <div className='fixed inset-0 z-0'>
                    <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
                    <div className='absolute inset-0 backdrop-blur-sm' />
                </div>
    
                <Sidebar />
                <Routes>
				<Route path='/overview' element={<OverviewPage />} />
				<Route path='/Volunteers' element={<UsersPage />} />
				<Route path='/chalan' element={<SalesPage />} />
				<Route path='/settings' element={<SettingsPage />} />
                </Routes>
            </div>
        );
};
export default MainPage;
