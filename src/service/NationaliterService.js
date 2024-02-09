import axios from "axios";

import { API_URL } from "./config_url";

const REST_API_BASE_URL =API_URL+'/api/pays/all'

export const listnationaliter = () => axios.get(REST_API_BASE_URL);
