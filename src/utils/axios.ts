import axios from 'axios';

/**
 * Create an axios instance with a predefined base URL.
 * This instance can be used for making HTTP requests to
 * a specific API.
 * @module axiosInstance
 * @type {axios}
 */
export default axios.create({
  baseURL: 'https://projet-05-o-world-back-production.up.railway.app/api',
});
