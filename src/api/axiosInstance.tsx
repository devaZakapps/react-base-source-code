import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { redirectToPage } from '../utils/utils';

// Create an Axios instance
const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAuthToken(); // Retrieve the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Retrieve and add `ui-user-id` header
    const uiUserId = getUiUserId();
    if (uiUserId) {
      config.headers['ui-user-id'] = uiUserId;
    }


    return config;
  },
  (error) => Promise.reject(error)
);


export const getUiUserId = (): string | undefined => {
  const userDetails = localStorage.getItem('user_details');
  if (userDetails) {
    try {
      const parsedData = JSON.parse(userDetails);
      const userId = parsedData?.userData?.[0]?.userId; // Navigate to userId
      return userId ? String(userId) : undefined; // Ensure it's a string
    } catch (error) {
      console.error('Error parsing user_details from localStorage:', error);
    }
  }
  return undefined;
};

export const getUserEmail = (): string | undefined => {
  const userDetails = localStorage.getItem('user_details');
  if (userDetails) {
    try {
      const parsedData = JSON.parse(userDetails);
      const userId = parsedData?.userData?.[0]?.email; // Navigate to userId
      return userId ? String(userId) : undefined; // Ensure it's a string
    } catch (error) {
      console.error('Error parsing user_details from localStorage:', error);
    }
  }
  return undefined;
};


// Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized - redirect to login');
      // Handle logout or token refresh here
      redirectToPage('/login', false);
    }
    return Promise.reject(error);
  }
);

const getAuthToken = async () => {
  return localStorage.getItem('session_id');
};

export default axiosInstance;
