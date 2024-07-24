import axios from 'axios';

const API_URL = 'https://book-review-five.vercel.app/api/auth/'; // Adjust the URL to match your backend

const register = (username, email, password) => {
    return axios.post(API_URL + 'register', { username, email, password });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return axios.get(API_URL + 'me', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
    }).then(response => {
        return response.data;
    });
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};
