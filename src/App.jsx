import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import MainPage from "./pages/MainPage";
import Demo from "./pages/LoginPage";

function App() {
	return (
		<div >
			{/* BG */}


			 
			<Routes>
				<Route path='/' element={<Demo />} />
				<Route path='/overview' element={<OverviewPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/Volunteers' element={<UsersPage />} />
				<Route path='/chalan' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default App;
