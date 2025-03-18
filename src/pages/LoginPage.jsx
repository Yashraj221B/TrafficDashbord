import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trafficLogo from '../assets/traffic-police-logo.jpg'; // Add your logo to assets folder

const LoginPage = ({ setter }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Reset authentication state when the component mounts
        setter(false, "");
        
        // Add title
        document.title = "Traffic Buddy - Admin Dashboard";
    }, [setter]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        // Validate input fields
        if (username.trim() === '' || password.trim() === '') {
            setError('Please enter both username and password');
            return;
        }
        
        setIsLoading(true);
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Check against hardcoded credentials
            if (username === 'Admin' && password === 'trafficBuddy@123') {
                // Authentication successful
                setter(true, username);
                navigate('/overview');
            } else {
                // Authentication failed
                setError('Invalid username or password');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg
shadow-bgPrimary border border-gray-100">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <img 
                            src={trafficLogo} 
                            alt="Traffic Police Logo" 
                            className="h-16 w-auto" 
                            onError={(e) => e.target.src = 'https://placehold.co/64x64?text=TP'} 
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Traffic Buddy Admin Portal</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your credentials to access the dashboard</p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="rounded-md -space-y-px">
                        <div className="mb-5">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your username"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            } transition-colors duration-150`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Traffic Buddy Administration Portal &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;