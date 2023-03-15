import axios from 'axios';
import { getItem } from '@/helpers/persistanceStorage';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.interceptors.request.use((config) => {
  const token = getItem('accessToken');
  config.headers.Authorization = token ? `Token ${token}` : '';
  return config;
});

export default axios;
