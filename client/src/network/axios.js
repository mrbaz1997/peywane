import axios from "axios";
import { BACKEND_BASE_URL } from "../configs/network";

const httpService = axios.create({ baseURL: BACKEND_BASE_URL });
const httpServiceInterceptor = axios.create({ baseURL: BACKEND_BASE_URL });

httpServiceInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default httpService;
export { httpServiceInterceptor };
