import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Import the useTheme hook
import { useTheme } from '../context/ThemeContext';

// Sun and Moon SVG icons for the button
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    // Get theme state and toggle function from context
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white dark:bg-slate-800 shadow-md transition-colors">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-slate-800 dark:text-white">
                    Bookish
                </Link>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/add-book" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">Add Book</Link>
                            <span className="font-medium text-slate-700 dark:text-slate-200">Welcome, {user.name}</span>
                            <button onClick={handleLogout} className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">Login</Link>
                            <Link to="/signup" className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">Sign Up</Link>
                        </>
                    )}
                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700">
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;