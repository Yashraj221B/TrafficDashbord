import { useEffect, useState } from 'react';
import Login, { Render } from 'react-login-page';

const LoginPage = ({ setter }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setter(false, "");
    }, [setter]);

    const handleSubmit = () => {
        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password cannot be empty');
            return;
        }
        setter(true, username);
        console.log(username, password);
        window.location.href = '/overview';
    };

    return (
        <Login>
            <Render>
                {({ fields, buttons, blocks, $$index }) => {
                    return (
                        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                                <header className="text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <span className="w-10 h-10">{blocks.logo}</span>
                                        <h2 className="text-2xl font-bold text-gray-800">{blocks.title}</h2>
                                    </div>
                                </header>
                                <div className="space-y-6">
                                    {error && <div className="text-red-500 text-sm">{error}</div>}
                                    <div className="rounded-md">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="rounded-md">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <div className="mt-1">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between space-x-4">
                                        <span className="w-full">
                                            <button
                                                type="button"
                                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                        </span>
                                        <span className="w-full">
                                            <button
                                                type="reset"
                                                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                onClick={() => {
                                                    setUsername('');
                                                    setPassword('');
                                                    setError('');
                                                }}
                                            >
                                                Reset
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Render>
            <Login.Block keyname="logo" tagName="span">
                
            </Login.Block>
            <Login.Block keyname="title" tagName="span">
                Traffic Dashboard Login
            </Login.Block>
        </Login>
    );
};

export default LoginPage;