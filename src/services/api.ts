import Axios from 'axios';
import { JURIDOC_API } from '../configs/Environment';

const api = Axios.create({
  baseURL: JURIDOC_API,
  withCredentials: true,
});



api.interceptors.response.use(
  (response) => response,
  (error) => ({
    error: error.response.data.message,
  }),
);
export default api;
