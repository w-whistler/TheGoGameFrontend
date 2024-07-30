import axios from 'axios';
import { getSecureStoreValue } from './storage';
import Toast from 'react-native-toast-message';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const accessToken = await getSecureStoreValue('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Toast.show({
      type: 'error',
      text1: error.toString(),
    });

    return Promise.reject(error);
  },
);

export default axiosInstance;
