import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry, { exponentialDelay } from 'axios-retry';

let axiosInstance: AxiosInstance;

axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
});

// Axios retry
axiosRetry(axiosInstance, {
  retries: 2,
  retryDelay: exponentialDelay,
});

export default axiosInstance;

export async function get(
  url: string,
  config?: AxiosRequestConfig
): Promise<any> {
  return axios
    .get(url, { ...config })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw console.log(err);
    });
}
