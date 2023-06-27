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

    if (
      error.response &&
      error.response.data.httpCode === 401 &&
      error.response.data.message === 'jwt expired' &&
      !originalRequest._retry
    ) {
      console.log('jai passé le if');
      originalRequest._retry = true;

      try {
        console.log('je suis dans le try');

        // const refreshToken = localStorage.getItem('refreshToken');
        const refreshToken = '';
        console.log('jai recuperé le refreshToken', refreshToken);

        const response = await axiosInstance.post('/log/refresh-token', {
          refreshToken: refreshToken,
        });

        console.log(response);

        if (response.status === 200) {
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          const retryResponse = await axiosInstance(originalRequest);
          return retryResponse;
        } else {
          console.log('je suis dands le else');
          throw new Error('Erreur lors du rafraîchissement du token');
        }
      } catch (error: string | any) {
        console.log('je suis dans le catch error');
        console.log(error.response.data.error);

        throw error;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
