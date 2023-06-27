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
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log('jai passé le if');
      originalRequest._retry = true;

      try {
        console.log('je suis dans le try');

        const refreshToken = localStorage.getItem('refreshToken');
        // const refreshToken =
        //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2MzJ9LCJpYXQiOjE2ODc4NzM3MTAsImV4cCI6MTY4ODQ3ODUxMH0.ExohUQTyjOWwjjCFxrVYEcYPQRDnNADthGSp3p-SoL4';
        console.log('jai recuperé le refreshToken bidoullié', refreshToken);

        const response = await axiosInstance.post('/log/refresh-token', {
          refreshToken: refreshToken,
        });

        console.log('reponsedata', response.data);

        if (response.status === 200) {
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          const retryResponse = await axiosInstance(originalRequest);
          return retryResponse;
        } else {
          console.log(response.data);
          console.log('je suis dands le else');

          console.log('Erreur lors du rafraîchissement du token');
          throw new Error('Erreur lors du rafraîchissement du token');
        }
      } catch (error: string | any) {
        console.log(error.response.data);

        throw new Error(error.response.data.message as string);
      }
    }

    console.log('toto');

    return Promise.reject(error);
  }
);

export default axiosInstance;
