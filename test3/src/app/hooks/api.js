import axios from 'axios';

const createAxiosInstance = ({header} = {}) => {
  const headers = {
      "Content-Type": "application/json",
      "accept": "application/json",
      ...header
  };
  return axios.create({
    baseURL: 'http://api.weatherapi.com/v1/',
    withCredentials: false,
    headers
  });
}
export const useApiClient = ({header} = {}) => {
  return createAxiosInstance({header})
}