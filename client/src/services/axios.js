import axios from "axios";
import { BACKEND_BASE_URL } from "../configs/network";

const httpService = axios.create({ baseURL: BACKEND_BASE_URL });
export default httpService;
