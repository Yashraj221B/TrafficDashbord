import { useState, useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import ChalanPage from "./pages/ChalanPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";


function App() {

	function setLocalStorage(_isLoggedIn, _username) {
		setIsLoggedIn(_isLoggedIn)
		localStorage.setItem('isLoggedIn', _isLoggedIn);
		localStorage.setItem('username', _username);
	}

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn');
    });

	return (

		<div className={isLoggedIn ? 'flex h-screen bg-gray-900 text-gray-100 overflow-hidden' : ''}>
			{/* BG */}
			{isLoggedIn && 
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>
			}

			{isLoggedIn && <Sidebar />}

			<Routes>
				<Route path='/'           element={<LoginPage setter={setLocalStorage}/>} />
				<Route path='/overview'   element={<OverviewPage />} />
				<Route path='/Volunteers' element={<UsersPage />} />
				<Route path='/chalan'     element={<ChalanPage />} />
				<Route path='/settings'   element={<SettingsPage />} />
			</Routes>

		</div>
	);
}

export default App;
