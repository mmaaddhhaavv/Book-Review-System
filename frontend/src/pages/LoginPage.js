import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await axiosInstance.post('/users/login', formData);
            login(data); // Update auth context
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
    <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Login</h2>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md space-y-6">
                <div>
            <label className="dark:text-slate-300">Email</label>
            <input type="email" name="email" onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600" />
        </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Login</button>
            </form>
            <p className="text-center mt-4 dark:text-slate-300">
        No account? <Link to="/signup" className="text-indigo-600 dark:text-indigo-400">Sign Up</Link>
    </p>
        </div>
    );
};

export default LoginPage;