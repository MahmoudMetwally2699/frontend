import axios from 'axios';

const API_URL = ' https://book-review-five.vercel.app/api/reviews/'; // Ensure the URL matches your backend server's address

const addReview = (title, author, reviewText, rating, image) => {
    return axios.post(API_URL, { title, author, reviewText, rating, image }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
    });
};

const getReviews = (page = 1, search = '') => {
    return axios.get(API_URL, {
        params: { page, search }
    });
};

const getReviewById = (id) => {
    return axios.get(API_URL + id);
};

const updateReview = (id, title, author, reviewText, rating, image) => {
    return axios.put(API_URL + id, { title, author, reviewText, rating, image }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
    });
};

const deleteReview = (id) => {
    return axios.delete(API_URL + id, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
    });
};

const getUserReviews = (page = 1, search = '') => {
    return axios.get(`${API_URL}user/me`, {
        params: { page, search },
        headers: { 'x-auth-token': localStorage.getItem('token') }
    });
};

export default {
    addReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getUserReviews
};
