import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ඔබේ Backend URL එක මෙතැනට දෙන්න
});

// JWT Token එක Request Headers වලට එකතු කිරීම
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createDoctor = async (doctorData) => {
  const response = await API.post('/doctors', doctorData);
  return response.data;
};

export const fetchDoctors = async () => {
  const response = await API.get('/doctors');
  return response.data;
};

export default API;