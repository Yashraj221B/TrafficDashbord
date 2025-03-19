import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/common/Sidebar';
import LoginPage from './pages/LoginPage';
import OverviewPage from './pages/OverviewPage';
import UsersPage from './pages/UsersPage';
import ChalanPage from './pages/ChalanPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthContext';
import { DivisionProvider } from './contexts/DivisionContext';
import authService from './services/authService';

// Admin-only route component
const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  
  if (userRole !== 'main_admin') {
    // Redirect non-admin users to the overview page
    return <Navigate to="/overview" replace />;
  }
  
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  function setLocalStorage(_isLoggedIn, _username) {
    setIsLoggedIn(_isLoggedIn);
    setUsername(_username);
    
    if (_isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', _username);
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      localStorage.removeItem('divisionId');
      localStorage.removeItem('divisionName');
      authService.logout();
    }
  }

  // Set auth token on app load if it exists
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      authService.setToken(token);
    }
  }, []);

  return (
    <AuthProvider>
      <DivisionProvider>
        <div className={isLoggedIn ? 'flex h-screen bg-bgPrimary text-tBase overflow-hidden' : ''}>
          {/* Toast notifications */}
          <Toaster position="top-right" />
          
          {/* BG */}
          {isLoggedIn && 
          <div className='fixed inset-0 z-0'>
            <div className='absolute inset-0 bg-gradient-to-br from-bgPrimary via-primary to-bgPrimary opacity-80' />
            <div className='absolute inset-0 backdrop-blur-sm' />
          </div>
          }

          {isLoggedIn && <Sidebar />}

          <Routes>
            <Route path='/' element={<LoginPage setter={setLocalStorage}/>} />
            <Route path='/login' element={<LoginPage setter={setLocalStorage}/>} />
            
            <Route path='/overview' element={
              <ProtectedRoute>
                <OverviewPage />
              </ProtectedRoute>
            } />
            
            <Route path='/volunteers' element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            } />
            
            {/* Admin-only route */}
            <Route path='/chalan' element={
              <ProtectedRoute>
                <AdminRoute>
                  <ChalanPage />
                </AdminRoute>
              </ProtectedRoute>
            } />
            
            <Route path='/settings' element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </DivisionProvider>
    </AuthProvider>
  );
}

export default App;