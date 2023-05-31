import axios from 'axios';
/**
 * Axios defaults
 */
axios.defaults.baseURL = process?.env?.API_URL || 'https://dummyjson.com';

// axios.defaults.baseURL = process?.env?.API_URL || 'http://localhost:3000/api';

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

/**
 * Request Interceptor
 */
axios.interceptors.request.use(
  async (inputConfig) => {
    const config = inputConfig;

    // Check for and add the stored Auth Token to the header request
    let token = '';
    try {
      token = '';
    } catch (error) {
      /* Nothing */
    }
    if (token) {
      config.headers.common['X-Authorization'] = `Bearer ${token}`;
      // console.log(`Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    throw error;
  },
);

/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  (res) => {
    // Status code isn't a success code - throw error
    if (!`${res.status}`.startsWith('2')) {
      throw res.data;
    }

    // Otherwise just return the data
    return res;
  },
  (error) => {
    // Pass the response from the API, rather than a status code
    if (error && error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  },
);

export default axios;
