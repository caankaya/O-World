import axios from 'axios';
/**
 * Create an axios instance with a predefined base URL.
 * This instance can be used for making HTTP requests to
 * a specific API.
 * @module axiosInstance
 * @type {axios}
 */
const axiosInstance = axios.create({
  baseURL: 'https://projet-05-o-world-back-production.up.railway.app/api',
});

console.log('axiosInstance :', axiosInstance);

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log('originalRequest :', originalRequest);
    if (
      error.response &&
      error.response.data.httpCode === 401 &&
      error.response.data.message === 'jwt expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        // const refreshToken = '';
        // const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlsIjo2MzJ9LCJpYXQiOjE2ODc4NzM3MTAsImV4cCI6MTY4ODQ3ODUxMH0.ExohUQTyjOWwjjCFxrVYEcYPQRDnNADthGSp3p-SoL4';

        const response = await axiosInstance.post('/log/refresh-token', {
          refreshToken: refreshToken,
        });

        if (response.status === 200) {
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          const retryResponse = await axiosInstance(originalRequest);
          return retryResponse;
        } else {
          throw new Error('Erreur lors du rafraîchissement du token');
        }
      } catch (error: string | any) {
        throw error;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
