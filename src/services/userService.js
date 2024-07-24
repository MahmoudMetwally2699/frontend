import axios from 'axios';

const API_URL = 'https://book-review-five.vercel.app/api/users/';

const getUserProfile = () => {
  return axios.get(API_URL + 'me', {
    headers: { 'x-auth-token': localStorage.getItem('token') }
  });
};

const updateUserProfile = (username, email) => {
  return axios.put(API_URL + 'me', { username, email }, {
    headers: { 'x-auth-token': localStorage.getItem('token') }
  });
};

export default {
  getUserProfile,
  updateUserProfile
};
