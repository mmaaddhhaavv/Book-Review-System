import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api';
});

// Interceptor to add the token to every request
axiosInstance.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
});

export default axiosInstance;
