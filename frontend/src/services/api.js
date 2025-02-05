import axios from 'axios';

const API_URL = 'http://localhost:7000/api';

const getToken = () => localStorage.getItem('token');  

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type':'applicaiton/json',
    },
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (email, password) => 
    api.post('/auth/login',{email,password});

export const registerUser = async (userData) =>
    api.post('/auth/register', userData);

export const getAllUsers =  async () => api.get('/users');

export default api;