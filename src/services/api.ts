import Axios from 'axios';
import { JURIDOC_API } from '../configs/Environment';
const API:string = 'https://juridoc-v3.herokuapp.com/api/v2'
const api = Axios.create({
  baseURL: API,
  withCredentials: true,
});

// JURIDOC_API

api.interceptors.response.use(
  (response) => response,
  (error) => ({
    error: error.response.data.message,
  }),
);
export default api;
