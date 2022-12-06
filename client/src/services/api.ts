import axios from 'axios';

const apiClient = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

export default apiClient;
